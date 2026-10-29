"""Prepare an English manual with offline Argos/OpenNMT (CTranslate2).

No text is sent to a translation API. Models and scratch files stay outside Git.
Run `prepare`, `translate --shard N --shards 8`, then `assemble`.
"""
import argparse
import hashlib
import json
import re
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path('public/manual')
CYRILLIC = re.compile(r'[А-Яа-яЁё]')
MODEL_URL = 'https://argos-net.com/v1/translate-ru_en-1_9.argosmodel'


def read(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))


def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')


def normalized(text):
    return ' '.join(text.split())


def strings(value):
    if isinstance(value, str):
        if CYRILLIC.search(value):
            yield normalized(value)
    elif isinstance(value, list):
        for item in value:
            yield from strings(item)
    elif isinstance(value, dict):
        for key, item in value.items():
            # Rebuilt from the translated tree. Machine-readable XML attributes stay intact.
            if key not in ('searchText', 'attrs'):
                yield from strings(item)


def sources():
    index = read(ROOT / 'index.json')
    docs = [read(ROOT / entry['path']) for entry in index['documents']]
    return index, docs


def prepare(work):
    index, docs = sources()
    segments = sorted(set(strings(index)).union(*(set(strings(doc)) for doc in docs)))
    write(work / 'segments.json', segments)
    print(f'{len(segments)} distinct segments; {sum(map(len, segments))} characters', flush=True)


def load_model(work):
    archive = work / 'ru-en.argosmodel'
    if not archive.exists():
        urllib.request.urlretrieve(MODEL_URL, archive)
    model_root = work / 'model'
    if not model_root.exists():
        with zipfile.ZipFile(archive) as package:
            for name in package.namelist():
                if Path(name).is_absolute() or '..' in Path(name).parts:
                    raise ValueError('Unsafe model archive')
            package.extractall(model_root)
    import ctranslate2
    import sentencepiece
    model = next(model_root.rglob('model.bin')).parent
    tokenizer_file = next(model_root.rglob('sentencepiece.model'))
    tokenizer = sentencepiece.SentencePieceProcessor(model_file=str(tokenizer_file))
    translator = ctranslate2.Translator(str(model), device='cpu', compute_type='int8', inter_threads=1, intra_threads=2)
    return tokenizer, translator, hashlib.sha256(archive.read_bytes()).hexdigest()


def translate(work, shard, shards):
    segments = read(work / 'segments.json')
    overrides = read('scripts/manual/translation-overrides.json')
    tokenizer, translator, model_hash = load_model(work)
    output = {}
    jobs = []
    for index, text in enumerate(segments):
        if index % shards != shard:
            continue
        if text in overrides:
            output[text] = overrides[text]
            continue
        # Split only at sentence boundaries, then at whitespace if a single sentence is very long.
        pieces = re.split(r'(?<=[.!?;])\s+', text)
        groups = []
        current = []
        for piece in pieces:
            for word in piece.split():
                candidate = ' '.join(current + [word])
                if current and len(tokenizer.encode(candidate)) > 350:
                    groups.append(' '.join(current))
                    current = []
                current.append(word)
        if current:
            groups.append(' '.join(current))
        for part, group in enumerate(groups):
            jobs.append((text, part, tokenizer.encode(group, out_type=str)))
    translated = {}
    for offset in range(0, len(jobs), 64):
        batch = jobs[offset:offset + 64]
        results = translator.translate_batch([job[2] for job in batch], beam_size=4,
                                            max_batch_size=2048, batch_type='tokens', max_decoding_length=768)
        for (source, part, _), result in zip(batch, results):
            target = tokenizer.decode(result.hypotheses[0]).strip()
            if not target:
                raise ValueError(f'Empty translation: {source}')
            translated.setdefault(source, []).append((part, target))
        print(f'shard {shard}: {min(offset + 64, len(jobs))}/{len(jobs)}', flush=True)
    output.update({source: ' '.join(value for _, value in sorted(parts)) for source, parts in translated.items()})
    write(work / f'translations-{shard}.json', {'modelSha256': model_hash, 'translations': output})


def replace(value, dictionary):
    if isinstance(value, str):
        if not CYRILLIC.search(value):
            return value
        text = normalized(value)
        if text not in dictionary:
            raise ValueError(f'Missing translation: {text}')
        leading = value[:len(value) - len(value.lstrip())]
        trailing = value[len(value.rstrip()):]
        return leading + dictionary[text] + trailing
    if isinstance(value, list):
        return [replace(item, dictionary) for item in value]
    if isinstance(value, dict):
        return {key: item if key == 'attrs' else replace(item, dictionary)
                for key, item in value.items() if key != 'searchText'}
    return value


def plain(nodes):
    return ' '.join(node if isinstance(node, str) else plain(node['children']) for node in nodes)


def assemble(work):
    index, docs = sources()
    dictionary = {}
    model_hashes = set()
    for file in sorted(work.glob('translations-*.json')):
        shard = read(file)
        dictionary.update(shard['translations'])
        model_hashes.add(shard['modelSha256'])
    dictionary.update(read('scripts/manual/translation-overrides.json'))
    required = set(read(work / 'segments.json'))
    if not required.issubset(dictionary):
        raise ValueError(f'Missing {len(required - dictionary.keys())} translations')
    if len(model_hashes) != 1:
        raise ValueError('Translation shards must use the same model')
    out = ROOT / 'en'
    translated_index = replace(index, dictionary)
    translated_index['language'] = 'en'
    translated_index['translation'] = 'machine'
    # Overview groups are identified by source IDs, not translated wording.
    for source, entry in zip(index['documents'], translated_index['documents']):
        entry['referenceKind'] = {'Список кодов неисправностей': 'dtc', 'Список моментов затяжки': 'torque'}.get(source['title'])
    search = []
    for doc in docs:
        target = replace(doc, dictionary)
        target['language'] = 'en'
        target['translation'] = 'machine'
        text = normalized(plain(target['body']))
        tags = set()
        def collect(nodes):
            for node in nodes:
                if isinstance(node, dict):
                    tags.add(node['tag'])
                    collect(node['children'])
        collect(target['body'])
        labels = translated_index['semanticLabels']
        text += ' ' + ' '.join(labels[tag] for tag in tags if tag in labels)
        target['searchText'] = text.strip()
        write(out / f"documents/{doc['id']}.json", target)
        search.append({key: target[key] for key in ('id', 'title', 'sectionId', 'groupTitle')} | {'text': target['searchText']})
    write(out / 'index.json', translated_index)
    write(out / 'search.json', search)
    # Explicit provenance, and no claim of human/technical verification.
    write(out / 'translation-report.json', {
        'engine': 'Argos Translate ru_en 1.9 / CTranslate2 int8',
        'modelUrl': MODEL_URL, 'modelSha256': next(iter(model_hashes)),
        'sourceIndexSha256': hashlib.sha256((ROOT / 'index.json').read_bytes()).hexdigest(),
        'documentCount': len(docs), 'segmentCount': len(required),
        'humanReviewed': False,
    })
    print(f'Prepared {len(docs)} English documents and full-text search', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['prepare', 'translate', 'assemble'])
    parser.add_argument('--work', type=Path, default=Path('.cache/manual-translation'))
    parser.add_argument('--shard', type=int, default=0)
    parser.add_argument('--shards', type=int, default=8)
    args = parser.parse_args()
    args.work.mkdir(parents=True, exist_ok=True)
    if args.command == 'prepare':
        prepare(args.work)
    elif args.command == 'translate':
        translate(args.work, args.shard, args.shards)
    else:
        assemble(args.work)
