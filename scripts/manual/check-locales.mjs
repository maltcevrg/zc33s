import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const json = async path => JSON.parse(await readFile(`public/manual/${path}`, 'utf8'));
const ru = await json('index.json');
const en = await json('en/index.json');
assert.equal(en.language, 'en');
assert.deepEqual(en.documents.map(d => d.id), ru.documents.map(d => d.id));
assert.deepEqual(en.sections.map(s => s.id), ru.sections.map(s => s.id));
assert.deepEqual(en.chapters.map(c => c.number), ru.chapters.map(c => c.number));
assert.deepEqual(Object.keys(en.targets), Object.keys(ru.targets));
const search = await json('en/search.json');
assert.deepEqual(search.map(d => d.id), en.documents.map(d => d.id));

function compareNodes(source, translated) {
  assert.equal(translated.length, source.length);
  for (let i = 0; i < source.length; i++) {
    const a = source[i], b = translated[i];
    if (typeof a === 'string') {
      assert.equal(typeof b, 'string');
      if (a.trim()) assert.ok(b.trim(), 'Nonempty source text cannot disappear');
    } else {
      assert.equal(b.tag, a.tag);
      assert.deepEqual(b.attrs, a.attrs, 'IDs, references, dimensions and resource paths must not change');
      compareNodes(a.children, b.children);
    }
  }
}

for (let i = 0; i < ru.documents.length; i++) {
  const entry = ru.documents[i];
  const source = await json(entry.path);
  const translated = await json(`en/${entry.path}`);
  assert.equal(translated.id, source.id);
  assert.equal(translated.language, 'en');
  assert.equal(translated.schemaVersion, source.schemaVersion);
  assert.equal(translated.title, en.documents[i].title);
  assert.equal(search[i].title, translated.title);
  assert.equal(search[i].text, translated.searchText);
  assert.deepEqual(translated.anchors, source.anchors);
  assert.deepEqual(translated.images, source.images);
  assert.deepEqual(translated.references.map(r => [r.targetId, r.anchor, r.available]), source.references.map(r => [r.targetId, r.anchor, r.available]));
  compareNodes(source.body, translated.body);
}
const report = await json('en/translation-report.json');
assert.equal(report.documentCount, ru.documents.length);
console.log(`English dataset: ${en.documents.length} documents; structure, links, illustrations and search verified.`);
console.log(`Machine translation requires technical review (${report.segmentsRequiringReview} flagged segments).`);
