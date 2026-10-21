import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCard } from '../vite.config.js';

// Формат card.txt описан в docs/card-format.md: поля заглавными буквами
// в виде «ПОЛЕ - значение», значение может занимать несколько строк.

const SAMPLE = `HEADER - Турбина GR30

HIGHLIGHTS -
Гибридный картридж
≈220 л.с.

SUMMARY -
Краткое описание карточки.

SPECS -
Тип — гибридная турбина
Артикул — TD02L11-025*075WDS-F3.4

POWER -
Расчётная мощность — до 220 л.с.

REQUIRED -
Топливо не ниже АИ-98
Настройка калибровки

VARIANTS -
65 000 ₽ — базовая версия
80 000 ₽ — с установкой
Сроки обсуждаются отдельно.

WARRANTY - 6 месяцев

ORDER - 10
`;

test('parseCard разбирает все поля карточки', () => {
  const card = parseCard(SAMPLE, 'GR30');

  assert.equal(card.title, 'Турбина GR30');
  assert.equal(card.hasHeader, true);
  assert.deepEqual(card.highlights, ['Гибридный картридж', '≈220 л.с.']);
  assert.equal(card.summary, 'Краткое описание карточки.');
  assert.equal(card.power, 'Расчётная мощность — до 220 л.с.');
  assert.equal(card.warranty, '6 месяцев');
  assert.equal(card.order, 10);
});

test('parseCard разбивает SPECS на пары «параметр — значение»', () => {
  const { specs } = parseCard(SAMPLE, 'GR30');

  assert.deepEqual(specs[0], { label: 'Тип', text: 'гибридная турбина' });
  // Артикул содержит «*», поэтому разделителем считается только « — » с пробелами.
  assert.deepEqual(specs[1], { label: 'Артикул', text: 'TD02L11-025*075WDS-F3.4' });
});

test('parseCard отделяет цены вариантов от пояснений', () => {
  const { variants, variantNotes } = parseCard(SAMPLE, 'GR30');

  assert.deepEqual(variants, [
    { price: '65 000 ₽', text: 'базовая версия' },
    { price: '80 000 ₽', text: 'с установкой' },
  ]);
  assert.deepEqual(variantNotes, ['Сроки обсуждаются отдельно.']);
});

test('parseCard не падает на пустом файле и берёт имя папки как заголовок', () => {
  const card = parseCard('', 'Stage 1');

  assert.equal(card.title, 'Stage 1');
  assert.equal(card.hasHeader, false);
  assert.equal(card.order, null);
  assert.deepEqual(card.highlights, []);
  assert.deepEqual(card.images === undefined ? [] : card.images, []);
});

test('parseCard понимает BOM и переводы строк CRLF', () => {
  const raw = '\uFEFFHEADER - Stage 2\r\n\r\nORDER - 3\r\n';

  const card = parseCard(raw, 'Stage 2');

  assert.equal(card.title, 'Stage 2');
  assert.equal(card.order, 3);
});

test('parseCard игнорирует строки описания, похожие на поля', () => {
  const raw = 'HEADER - Тест\n\nDESC -\nPrice - 100 ₽\nи ещё немного текста\n';

  const card = parseCard(raw, 'demo');

  assert.equal(card.description, 'Price - 100 ₽\nи ещё немного текста');
});
