import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('manual_translation', Path(__file__).with_name('translate.py'))
translation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(translation)


class TranslationTests(unittest.TestCase):
    def test_text_changes_but_identifiers_and_tree_do_not(self):
        source = {'id': 'AJPHSB0PF03I001', 'title': 'Основные особенности',
                  'body': [{'tag': 'ptxt', 'attrs': {'id': 'section-1', 'name': 'оригинал'},
                            'children': ['\n двигатель \n', ' K14C 73.0 × 81.9 mm']}],
                  'searchText': 'generated separately'}
        target = translation.replace(source, {'Основные особенности': 'Main features', 'двигатель': 'Engine'})
        self.assertEqual(target['id'], source['id'])
        self.assertEqual(target['body'][0]['attrs'], source['body'][0]['attrs'])
        self.assertEqual(target['body'][0]['children'], ['\n Engine \n', ' K14C 73.0 × 81.9 mm'])
        self.assertEqual(source['title'], 'Основные особенности')
        self.assertNotIn('searchText', target)

    def test_missing_text_never_silently_falls_back_to_russian(self):
        with self.assertRaisesRegex(ValueError, 'Missing translation'):
            translation.replace({'title': 'Проверка'}, {})

    def test_segments_ignore_identifiers_and_duplicate_search_text(self):
        self.assertEqual(list(translation.strings({'title': ' Проверка ', 'attrs': {'id': 'проверка'}, 'searchText': 'текст поиска'})), ['Проверка'])

    def test_given_document_is_fully_covered_by_explicit_translations(self):
        document = translation.read('public/manual/documents/AJPHSB0PF03I001.json')
        glossary = translation.read('scripts/manual/translation-overrides.json')
        result = translation.replace(document, glossary)
        self.assertFalse(list(translation.strings(result)))
        self.assertEqual(result['anchors'], document['anchors'])


if __name__ == '__main__':
    unittest.main()
