import test from 'node:test';
import assert from 'node:assert/strict';

import { cardsPlugin } from '../plugins/cards-plugin.js';

// Мини-контекст Rollup для load(): плагин пользуется warn/error/addWatchFile/emitFile.
function context(overrides = {}) {
  return {
    addWatchFile() {},
    warn() {},
    error(message) {
      throw new Error(message);
    },
    emitFile() {
      throw new Error('emitFile не должен вызываться в режиме serve');
    },
    ...overrides,
  };
}

function setup(directory, moduleId, command = 'serve') {
  const plugin = cardsPlugin({ directory, moduleId, name: 'test-cards' });
  plugin.configResolved({ root: process.cwd(), base: '/zc33s/', command });
  return { plugin, virtualId: `\0${moduleId}`, moduleId };
}

test('модуль карточек резолвится как виртуальный (сканер зависимостей его пропускает)', () => {
  const { plugin, virtualId, moduleId } = setup('TuningCards', 'virtual:tuning-cards');

  assert.equal(plugin.resolveId(moduleId), virtualId);
  assert.equal(plugin.resolveId('react'), null);
});

test('модуль карточек содержит данные и ASCII-адреса картинок', () => {
  const { plugin, virtualId } = setup('TuningCards', 'virtual:tuning-cards');
  const code = plugin.load.call(context(), virtualId);

  assert.match(code, /^export default \[/);
  assert.match(code, /id: "Stage 1"/);

  const urls = [...code.matchAll(/"(?:https?:)?\/[^"]*"/g)].map((match) => match[0]);
  assert.ok(urls.length >= 6, `ожидались адреса картинок, найдено ${urls.length}`);

  for (const url of urls) {
    // Только ASCII: пробелы и кириллица в адресах ломаются на прокси.
    assert.match(url, /^"[\x20-\x7e]+"$/, `не-ASCII адрес: ${url}`);
    assert.ok(url.includes('/card-images/'), `адрес картинки должен идти через card-images: ${url}`);
  }
});

test('кириллические имена папок тоже дают ASCII-адреса', () => {
  const { plugin, virtualId } = setup('CustomCards', 'virtual:custom-cards');
  const code = plugin.load.call(context(), virtualId);

  assert.match(code, /id: "Турбина GR30"/);
  assert.ok(!/Турбина[^"]*\/images/.test(code), 'путь к файлу не должен попадать в адрес');
  assert.match(code, /\/card-images\/[0-9a-f]+\/0\.jpg/);
});

test('в production-сборке картинки уходят в emitFile, а не в card-images', () => {
  const { plugin, virtualId } = setup('TuningCards', 'virtual:tuning-cards', 'build');

  const emitted = [];
  const buildContext = context({
    emitFile(file) {
      emitted.push(file.name);
      return `ref${emitted.length - 1}`;
    },
  });

  const code = plugin.load.call(buildContext, virtualId);

  assert.ok(emitted.length >= 6, `ожидались картинки, отправленные в сборку: ${emitted.length}`);
  assert.ok(
    emitted.every((name) => /^[0-9a-f]+-\d+\.jpg$/.test(name)),
    `имена: ${emitted.join(', ')}`
  );
  assert.match(code, /import\.meta\.ROLLUP_FILE_URL_ref0/);
  assert.ok(!code.includes('/card-images/'), 'в сборке dev-адреса не нужны');
});

test('отсутствующая папка карточек даёт пустой список, а не падение', () => {
  const { plugin, virtualId } = setup('NoSuchCards', 'virtual:none-cards');

  assert.equal(plugin.load.call(context(), virtualId), 'export default [];');
});
