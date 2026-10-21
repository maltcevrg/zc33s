import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

import { cardsPlugin } from '../plugins/cards-plugin.js';

const root = process.cwd();

function setup(directory, virtualPath) {
  const plugin = cardsPlugin({ directory, virtualPath, name: 'test-cards' });
  plugin.configResolved({ root, base: '/zc33s/', command: 'serve' });
  return { plugin, modulePath: resolve(root, virtualPath) };
}

// Мини-контекст Rollup для load(): плагин пользуется warn/error/addWatchFile.
const context = {
  addWatchFile() {},
  warn() {},
  error(message) {
    throw new Error(message);
  },
  emitFile() {
    throw new Error('emitFile не должен вызываться в режиме serve');
  },
};

test('импорт из страницы резолвится в обычный путь, а не в virtual-модуль', () => {
  const { plugin, modulePath } = setup('TuningCards', 'src/data/cards-tuning.js');

  // Относительный импорт (../data/cards-tuning.js) из страницы.
  assert.equal(
    plugin.resolveId('../data/cards-tuning.js', resolve(root, 'src/pages/TuningPage.jsx')),
    modulePath
  );
});

test('запрос самого модуля по URL с base тоже резолвится', () => {
  const { plugin, modulePath } = setup('TuningCards', 'src/data/cards-tuning.js');

  assert.equal(plugin.resolveId('/zc33s/src/data/cards-tuning.js'), modulePath);
  assert.equal(plugin.resolveId('/src/data/cards-tuning.js'), modulePath);
  assert.equal(plugin.resolveId('/zc33s/src/pages/TuningPage.jsx'), null);
});

test('модуль карточек содержит данные и ASCII-адреса картинок', () => {
  const { plugin, modulePath } = setup('TuningCards', 'src/data/cards-tuning.js');
  const code = plugin.load.call(context, modulePath);

  assert.match(code, /^export default \[/);
  assert.match(code, /id: "Stage 1"/);

  const urls = [...code.matchAll(/"(https?:|\/)[^"]*"/g)].map((match) => match[0]);
  assert.ok(urls.length >= 6, `ожидались адреса картинок, найдено ${urls.length}`);

  for (const url of urls) {
    // Только ASCII: пробелы и кириллица в адресах ломаются на прокси.
    assert.match(url, /^"[\x20-\x7e]+"$/, `не-ASCII адрес: ${url}`);
    assert.ok(url.includes('/card-images/'), `адрес картинки должен идти через card-images: ${url}`);
  }
});

test('кириллические имена папок тоже дают ASCII-адреса', () => {
  const { plugin, modulePath } = setup('CustomCards', 'src/data/cards-custom.js');
  const code = plugin.load.call(context, modulePath);

  assert.match(code, /id: "Турбина GR30"/);
  assert.ok(!/Турбина[^"]*\/images/.test(code), 'путь к файлу не должен попадать в адрес');
  assert.match(code, /\/card-images\/[0-9a-f]+\/0\.jpg/);
});

test('в production-сборке картинки уходят в emitFile, а не в card-images', () => {
  const plugin = cardsPlugin({
    directory: 'TuningCards',
    virtualPath: 'src/data/cards-tuning.js',
    name: 'test',
  });
  plugin.configResolved({ root, base: '/zc33s/', command: 'build' });

  const emitted = [];
  const buildContext = {
    ...context,
    emitFile(file) {
      emitted.push(file.name);
      return `ref${emitted.length - 1}`;
    },
  };

  const code = plugin.load.call(buildContext, resolve(root, 'src/data/cards-tuning.js'));

  assert.ok(emitted.length >= 6, `ожидались картинки, отправленные в сборку: ${emitted.length}`);
  assert.ok(
    emitted.every((name) => /^[0-9a-f]+-\d+\.jpg$/.test(name)),
    `имена: ${emitted.join(', ')}`
  );
  assert.match(code, /import\.meta\.ROLLUP_FILE_URL_ref0/);
});
