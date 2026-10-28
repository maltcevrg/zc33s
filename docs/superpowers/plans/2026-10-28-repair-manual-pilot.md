# Repair Manual Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сделать работающий раздел «Зажигание → K14C» из 11 исходных материалов с современным просмотрщиком, поиском, схемами, переходами и печатью.

**Architecture:** Локальный Node-импортёр читает разрешённые элементы RAR через UnRAR, разбирает XML и готовит проверенные JSON и JPG. React загружает индекс и открытый документ отдельно; JSON хранит упорядоченное дерево содержимого с исходными идентификаторами. Подготовленные данные включаются в статическую сборку; CI не зависит от архива и UnRAR.

**Tech Stack:** Существующие React 18, React Router 6, Vite 6, Sass; Node `node:test`, `node:assert/strict`, `node:crypto`, `node:child_process`; добавить `@xmldom/xmldom` только в devDependencies для локального импорта. Версию зафиксировать в package-lock при установке и проверить API по документации установленной версии.

**Spec:** `docs/superpowers/specs/2026-10-28-repair-manual-pilot-design.md`

## Global Constraints

- «Пробный раздел: зажигание, K14C · 11 материалов».
- «Путь размещения приложения — `/zc33s/`»; URL ресурсов учитывают `import.meta.env.BASE_URL`.
- «Содержимое руководства помечается `lang="ru"`»; переводятся только элементы интерфейса.
- «Ошибки перевода исходника автоматически не исправлять».
- «Незнакомые значимые элементы, неразрешённые сущности и пропущенные ресурсы в пробных документах считаются ошибками импорта».
- «Исходные идентификаторы документов и подразделов сохраняются».
- «Для источника и подготовленных данных записывать контрольные суммы».
- «Для ссылок за пределами 11 материалов показывать название цели и явное сообщение «Этот материал пока не включён в пробный раздел»».
- «Не переносить исходные скрипты, ActiveX, Flash или обработчики событий».
- «Схемы остаются на светлом фоне в обеих темах».
- «Если браузер для визуальной проверки недоступен, это фиксируется как незавершённая проверка».
- Не публиковать сайт и не отправлять коммиты без отдельного указания пользователя; работа и проверка выполняются локально.

## Review Focus

1. В XML единицы измерения могут отсутствовать рядом с числом и добавляться оригинальным XSL: проверять исходный шаблон и выводить соответствующие единицы (задачи 2 и 5).
2. Ссылки-пиктограммы и ссылки с якорями должны иметь понятное название и правильную цель, включая цели за пределами пробы (задачи 2, 3 и 5).
3. Быстрое переключение документов и история браузера не должны показывать запоздалый результат предыдущей загрузки (задачи 4 и 5).
4. CALS-таблицы с `morerows`, пропущенными колонками или диапазонами столбцов должны сохранять расположение значений (задачи 2 и 5).
5. Импорт не должен принимать путь вне каталога, неизвестную сущность, неизвестный значимый XML-элемент или перезаписывать действующую пробу после неуспешной проверки (задачи 1–3).

## Файлы и контракты

Новые файлы импорта:

- `scripts/manual/archive.mjs` — список и чтение только разрешённых элементов архива, поиск UnRAR через аргумент/переменную среды/системный путь.
- `scripts/manual/xml.mjs` — строгий разбор XML и локальных символьных сущностей.
- `scripts/manual/pilot.mjs` — явный список 11 ID из спецификации и выбор ветки K14C из исходного оглавления.
- `scripts/manual/convert.mjs` — каталог названий, конвертация разрешённых XML-узлов и сбор контрольных данных.
- `scripts/manual/import.mjs` — CLI, подготовка файлов во временном каталоге, проверка и запись результата.
- `scripts/manual/check.mjs` — воспроизводимая проверка подготовленных ресурсов и ссылок.
- `scripts/manual/archive.test.mjs`, `scripts/manual/xml.test.mjs`, `scripts/manual/convert.test.mjs`, `scripts/manual/import.test.mjs` — содержательные тесты импорта.
- `scripts/manual/fixtures/` — точные исходные XML 11 документов, нужные индексы, файл сущностей и выдержки исходного XSL, необходимые для проверок. Включить SHA-256 и относительный путь каждого исходника; личные абсолютные пути не сохранять.

Новые файлы интерфейса:

- `src/features/manual/model.js` — URL, нормализация запросов, поиск, управление загрузкой; без React и без browser-only кода на уровне модуля.
- `src/features/manual/model.test.mjs` — проверки URL, поиска и запоздалых ответов.
- `src/features/manual/table.js` — вычисление строк и объединений CALS; чистая функция, используется также проверками импортёра.
- `src/features/manual/ManualContent.jsx` — отображение разрешённых узлов документа в семантические элементы React.
- `src/features/manual/ManualNavigation.jsx` — оглавление, поиск и выдача результатов.
- `src/features/manual/ManualImageDialog.jsx` — просмотр изображения с масштабом и управлением фокусом.
- `src/features/manual/manualContent.js` — словари элементов интерфейса RU/EN, подключаются к общему словарю.
- `src/features/manual/manual.scss` — стили раздела, диалога и печати.
- `src/pages/RepairManualPage.jsx` — состояние выбранного документа, загрузка, URL, ошибки, копирование, предыдущий/следующий материал.
- `public/manual/index.json`, `public/manual/search.json`, `public/manual/report.json`, `public/manual/documents/*.json`, `public/manual/images/*` — подготовленные данные.
- `docs/repair-manual.md` — команды импорта, формат данных, ограничения и фактические результаты проверок.

Изменяемые существующие файлы: `package.json`, `package-lock.json`, `src/App.jsx`, `src/pages/KnowledgeHubPage.jsx`, `src/i18n/translations.js`, `src/i18n/content/seo.js`, `vite.config.js`.

Формат дерева:

```js
import { createHash } from 'node:crypto';
// Текст — строка. Значимые пробелы текста сохраняются.
// Атрибуты пропускаются по белому списку, on* и произвольный HTML запрещены.
// На уровне JSON сохраняются только узлы внутри <servinfo>.
const node = { tag: 'ptxt', attrs: {}, children: ['Исходный текст'] };
// Пример структуры; SHA-256 рассчитывается из исходных байтов при импорте.
const sourceBytes = new TextEncoder().encode('Исходный текст');
const sourceSha256 = createHash('sha256').update(sourceBytes).digest('hex');
const document = {
  schemaVersion: 1, id: 'AJPHSB0P1836001',
  title: 'Снятие/установка свечей зажигания',
  section: '1H', engine: 'K14C', groupId: '6', groupTitle: 'Обслуживание',
  body: [node], anchors: [], images: [], references: [],
  searchText: 'Исходный текст', sourceSha256,
};
// Каждая reference: { targetId, anchor, title, available }.
// Каждое image: { sourceName, path, width, height, sha256 }.
// index.json: { schemaVersion, manualId, pilotLabel, documents, targets }.
// documents: [{id,title,groupId,groupTitle,path}]; порядок из XML-оглавления.
// targets: { [id]: {title,available} }; включает именованные внешние для пробы цели.
// search.json: [{id,title,groupTitle,text}].
```

## Task 1: Проверяемое чтение источника и XML

**Files:** создать `scripts/manual/archive.mjs`, `xml.mjs`, `pilot.mjs`, соответствующие `.test.mjs` и исходные fixtures; изменить package.json/package-lock.json.

**Interfaces:**

- `normalizeArchivePath(name: string): string` — возвращает путь с `/`, отклоняет абсолютные пути, drive prefixes, UNC, `..`, NUL и коллизии нормализованных имён.
- `openArchive(archivePath: string, {unrarPath?: string}): {list(): string[], read(relativePath: string): Buffer}` — без shell; файлы читаются в память, оригинальные EXE и скрипты не исполняются. Для чтения передавать точное имя из списка без wildcard.
- `parseXmlStrict(source: string, {entitySource?: string}): Document` — только XML, исключение при ошибках, неизвестных сущностях и любых неподдерживаемых внешних объявлениях.
- `PILOT_IDS: string[]` — 11 ID из спецификации в исходном порядке; используется во всех следующих задачах.

- [ ] Создать тесты ошибок до реализации. Минимальные проверяемые примеры:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeArchivePath } from './archive.mjs';
import { parseXmlStrict } from './xml.mjs';
test('archive rejects traversal and absolute paths', () => {
  for (const p of ['../escape.xml', 'C:\\escape.xml', '/escape.xml', '\\\\host\\share']) {
    assert.throws(() => normalizeArchivePath(p));
  }
});
test('XML preserves mixed text and rejects unknown entities', () => {
  const doc = parseXmlStrict('<ptxt>A<emph>18</emph> B&#176;</ptxt>');
  assert.equal(doc.documentElement.textContent, 'A18 B°');
  assert.throws(() => parseXmlStrict('<ptxt>&unknown;</ptxt>'));
  assert.throws(() => parseXmlStrict('<a><b></a>'));
});
```

- [ ] Выполнить `node --test scripts/manual/archive.test.mjs scripts/manual/xml.test.mjs`; подтвердить падение из-за отсутствующих модулей, затем добавить `@xmldom/xmldom` через `npm install --save-dev @xmldom/xmldom`.
- [ ] Реализовать чтение точных элементов UnRAR через `spawnSync` с проверкой кода завершения и ограничением буфера. Читать список в явно заданной Unicode-кодировке, проверить реальные кириллические имена; не определять имя архива через «первый подходящий файл» в продуктовой команде.
- [ ] При обработке DTD разрешить только ожидаемое подключение `config8/sdatacharaents.txt` из этого же архива. Из локального файла сущностей читать только активные объявления, исключая комментарии; символьные и структурные сущности (например `symbol`) сохранять как соответствующий текст/узел. Запретить произвольные SYSTEM/PUBLIC и рекурсивные расширения.
- [ ] Сохранить fixtures 11 XML, индексы структуры/названий, сущности и нужные выдержки XSL. Добавить тесты комментариев в сущностях, `&deg;`, смешанного содержимого, локальных `symbol` и запрета внешнего URL. Проверить fixtures по хешам.
- [ ] Повторить тесты; сохранить отдельный коммит только файлов задачи: `feat: add strict repair manual source reader`.

## Task 2: Перенос содержания, ссылок и таблиц

**Files:** создать `scripts/manual/convert.mjs`, `convert.test.mjs`, `src/features/manual/table.js`.

**Interfaces:**

- `buildTitleCatalog(structureDocuments: Document[]): Map<string,string>` — объединяет названия из всех `webdocstructure_*.xml`; разрешает одинаковые ID с одинаковым названием, противоречащие данные выводит как ошибку.
- `convertDocument(xml: string, {entities: string, titles: Map, availableIds: Set, imagePaths: Map}): ManualDocument` — возвращает дерево описанного формата, метаданные и контрольные количества.
- `layoutCalsTable(tgroup: ManualNode): {columns: number, rows: {header: boolean, cells: {node: ManualNode, column: number, colSpan: number, rowSpan: number}[]}[]}` — единый расчёт раскладки для импорта и React.

- [ ] Написать падающие проверки на настоящих fixtures:

```js
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { convertDocument } from './convert.mjs';
const source = name => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
const context = {
  entities: source('sdatacharaents.txt'),
  titles: new Map([
    ['AJPHSB0P1836001', 'Снятие/установка свечей зажигания'],
    ['AJPHSB0P1836002', 'Проверка свечей зажигания'],
    ['AJPHSB0P1836003', 'Снятие/установка катушки зажигания'],
    ['AJPHSB0P0101008', 'болты, гайки'],
  ]),
  availableIds: new Set(['AJPHSB0P1836001', 'AJPHSB0P1836002', 'AJPHSB0P1836003']),
  imagePaths: new Map(),
};
const result = convertDocument(source('AJPHSB0P1837001.xml'), context);
assert(result.references.some(r => r.targetId === 'AJPHSB0P1836001' && r.anchor === 'T1H303'));
assert(result.searchText.includes('18'));
assert(result.searchText.includes('N·m'));
const spark = convertDocument(source('AJPHSB0P1836001.xml'), context);
assert(spark.anchors.includes('T1H303'));
assert(spark.references.every(r => r.title.length > 0));
```

- [ ] Запустить `node --test scripts/manual/convert.test.mjs`, зафиксировать падение, затем реализовать белый список узлов. Сохранить все встреченные в пробе текстовые и структурные элементы; особые обработчики нужны для `attention1/3/4`, `intxref*`, `graphic`, `torque*`, `spec-sdm`, `servicetool*`, `button` и CALS-таблиц.
- [ ] Проверить исходные XSL: заголовки предупреждений, `t-value1` и его единицы, отображение номеров инструмента и специальной кнопки активного теста. Кнопку `activetest` переносить как информационную ссылку/обозначение исходного теста с названием из индекса сканера, с явным состоянием материала за пределами пробы. Не изображать подключение к автомобилю.
- [ ] Для ссылок-пиктограмм заменять только служебную иконку доступной текстовой ссылкой с названием из каталога. Для `graphic` заменять SWF на существующий JPG; путь брать из однозначного списка архива, а не угадывать каталог по имени.
- [ ] Добавить тест CALS с объединением первой ячейки на две строки и второй на два столбца: ожидаемые `rowSpan=2`, `colSpan=2`; следующая строка начинает занятие после активного rowSpan. Добавить случай colname без предыдущей ячейки и запрет пересекающихся диапазонов.
- [ ] Сопоставить количество график/таблиц/вопросов/ответов исходника с деревом всех 11 документов: 12/5/9/18. Сохранить порядок и текст всех 18 `action`; неизвестный значимый тег должен приводить к исключению.
- [ ] Выполнить все тесты задач 1–2; сохранить коммит `feat: preserve repair manual content and cross references`.

## Task 3: Повторяемый импорт и проверяемые статические данные

**Files:** создать `scripts/manual/import.mjs`, `check.mjs`, `import.test.mjs`, `public/manual/**`, `docs/repair-manual.md`; добавить npm scripts.

**Interfaces:**

- `buildPilot({archive, outputDir}): Promise<Report>` — соединяет предыдущие модули, пишет подготовленные данные после полной проверки.
- `checkPilot(rootDirectory: string): Report` — проверяет JSON, хеши, пути, якоря, доступность ресурсов и итоговые количества; бросает исключение при нарушении.
- CLI: `npm run manual:import -- --archive "<absolute archive path>" [--unrar "<absolute executable path>"]`.
- Команды: `manual:test` → `node --test` (автообнаружение `.test.mjs`, совместимое с Node 20 в CI); `manual:check` → `node scripts/manual/check.mjs`.

- [ ] Написать интеграционный тест `buildPilot` с подставным объектом archive `{list,read}` на fixtures и временным выходным каталогом из `mkdtemp`. Он должен получить 11 документов, 12 график и валидную цель `T1H303`; потеря картинки или неизвестный тег должны остановить импорт.
- [ ] Запустить тест, подтвердить падение, реализовать сборку. Подготовить отдельные JSON документов, каталог, индекс поиска и картинки. Во временной staging-папке полностью выполнить `checkPilot` перед записью. Обновлять целевой каталог только после проверки; при ошибке не трогать предыдущие данные. Перед любым рекурсивным удалением проверить разрешённый абсолютный путь.
- [ ] В отчёт включить manual ID, список 11 ID, SHA-256 RAR (через поток), каждого прочитанного исходника и подготовленного ресурса, версии формата/импортёра, количество узлов по типам, список ссылок с `available`, список недоступных в пробе целей и все сопоставления SWF→JPG. Личные абсолютные пути исключить. Хеш самого report не включать в него рекурсивно.
- [ ] Добавить тест целостности: изменить подготовленный JSON после импорта и получить ошибку хеша; удалить один JPG и получить ошибку ресурса. Проверить, что неуспешный повторный импорт оставляет предыдущий index.json неизменным.
- [ ] Выполнить реальный импорт с явно переданным пользовательским путём. Выполнить `npm run manual:check` и `npm run manual:test`. Все используемые картинки и назначения ссылок должны быть разрешены; назначения за пределами пробы допускаются только как явные ограничения.
- [ ] В `docs/repair-manual.md` записать команды, форматы, источник, ограничения 11 материалов и механизм повторного импорта. Сохранить коммит `feat: generate verified repair manual pilot assets`.

## Task 4: Поиск, адреса документов и надёжная загрузка

**Files:** создать `src/features/manual/model.js`, `model.test.mjs`.

**Interfaces:**

- `normalizeSearch(text: string): string` — нижний регистр, `ё→е`, схлопнутые пробелы.
- `searchManual(entries: SearchEntry[], query: string): {id,title,groupTitle,snippet}[]` — все токены должны встретиться; совпадения в названии выше, чем только в теле; исходный текст в фрагменте.
- `manualHref(id?: string, anchor?: string): string` — URL роутера `/manual/?doc=...#...` без повторного `/zc33s/`; ресурсные URL собираются отдельно.
- `createDocumentLoader(fetcher: Function): {load(url: string): Promise<ManualDocument|null>, cancel(): void}` — отменяет предыдущий запрос и дополнительно отбрасывает устаревшие ответы; `null` означает отмену, ошибки действующего запроса передаются вызывающему коду.

- [ ] Написать и выполнить падающие тесты:

```js
import assert from 'node:assert/strict';
import { normalizeSearch, manualHref, searchManual } from './model.js';
const entries = [
  {id: 'AJPHSB0P1836001', title: 'Снятие/установка свечей зажигания', groupTitle: 'Обслуживание', text: 'свеча зажигания 18 N·m'},
  {id: 'AJPHSB0P1834002', title: 'Проверка искры', groupTitle: 'Диагностика', text: 'Осмотрите катушку IG.'},
];
assert.equal(normalizeSearch('  ЁЖ  K14C '), 'еж k14c');
assert.equal(manualHref('AJPHSB0P1836001', 'T1H303'), '/manual/?doc=AJPHSB0P1836001#T1H303');
assert.deepEqual(searchManual(entries, 'несуществующее слово'), []);
assert.equal(searchManual(entries, 'свеча 18')[0].id, 'AJPHSB0P1836001');
```

- [ ] Реализовать функции; дополнить поисковые тесты запросом из тела и исходным ID. Пустой запрос возвращает пустую выдачу, чтобы UI показывал оглавление. Фрагменты извлекаются из исходного текста, а нормализованные смещения сопоставляются корректно при множественных пробелах.
- [ ] Добавить тест с двумя управляемыми Promise: начать A, затем B, разрешить B, затем A; результат B доступен, A возвращает null. Добавить отмену при размонтировании и повторную загрузку после ошибки. Не допускать глобального состояния одного загрузчика для нескольких страниц.
- [ ] Выполнить `npm run manual:test`; сохранить коммит `feat: add manual search and document loading model`.

## Task 5: Просмотрщик, навигация, схемы и печать

**Files:** создать `RepairManualPage.jsx`, `ManualContent.jsx`, `ManualNavigation.jsx`, `ManualImageDialog.jsx`, `manualContent.js`, `manual.scss`; использовать `table.js` и `model.js`.

**Interfaces:**

- `ManualContent({document, targets, onOpenImage})` — отображает дерево без `dangerouslySetInnerHTML` и без выполнения исходных атрибутов.
- `ManualNavigation({documents, results, query, onQueryChange, selectedId, expanded, onExpandedChange})` — семантическое nav, ссылки React Router и форма поиска с видимой подписью.
- `ManualImageDialog({image, onClose})` — image `{src,caption}`, управление масштабом, нативный `<dialog>` через `showModal()`.
- `RepairManualPage()` — страницы из URLSearchParams и location.hash; загрузка индекса, индекса поиска и выбранного документа.

- [ ] Применить навык frontend-design к реализации в рамках утверждённой палитры и структуры. Сначала создать базовую сетку: 280 px оглавление и ограниченный по ширине документ, при ширине до 767 px раскрываемое оглавление и одна колонка. Использовать существующие CSS-переменные и отдельные классы `.manual-*`, чтобы не менять статьи базы знаний.
- [ ] Реализовать renderer всех узлов, пропущенных конвертером: шаги как `ol/li` с корректным объединением последовательных `s1/s2`, предупреждения как именованные блоки, диагностика как нумерованные группы с вопросом/ответами «Да» и «Нет», CALS через `layoutCalsTable`, torque/service values/tool как отдельные блоки. Сохранить ID в DOM. Семантические подписи и единицы взять из проверенных исходных шаблонов задачи 2.
- [ ] Подключить выбор по `?doc=`, переходы между документами и якорями, previous/next, browser back/forward. После загрузки документа прокрутить к hash с отступом для фиксированной шапки. Для внешнего к пробе ID показать название и точный текст ограничения, для неизвестного ID — возврат к оглавлению.
- [ ] Для загрузки предусмотреть читаемые loading/error/retry состояния. Данные JSON получать от `${import.meta.env.BASE_URL}manual/...`; проверять HTTP status и версию формата. Использовать отдельные cleanup загрузчиков, чтобы поздние ответы не меняли текущую страницу.
- [ ] Реализовать схемы на белом фоне и dialog. Кнопки «Увеличить», «Уменьшить», «Сбросить», «Открыть исходное изображение», «Закрыть». Масштаб ограничить диапазоном 1–4. Прокрутка увеличенного изображения — внутри диалога. Проверить Escape, focus trap нативного dialog и возврат фокуса на кнопку открытия.
- [ ] Для копирования использовать `navigator.clipboard.writeText(window.location.href)` с await/catch; только успех меняет подпись на «Ссылка скопирована». При отказе показывать readonly поле с URL. Для печати вызвать `window.print()`, а в `@media print` скрыть шапку/подвал сайта, оглавление и кнопки; снять ограничения прокрутки таблиц и размеров иллюстраций.
- [ ] Подключить RU/EN словарь оболочки через общий `translations`; документ остаётся `lang="ru"`. Не скрывать реальные предупреждения и подписи для улучшения внешнего вида. У всех кнопок type, видимый фокус и доступное имя; reduced motion учитывается.
- [ ] Выполнить `npm run build`, затем браузерную проверку основной процедуры, диагностики и таблицы из критериев задачи 6. Сохранить коммит `feat: add responsive repair manual reader` после фактических доступных проверок; ограничения браузера записать честно.

## Task 6: Вход из базы знаний и приёмка пробы

**Files:** изменить `src/App.jsx`, `src/pages/KnowledgeHubPage.jsx`, `src/i18n/translations.js`, `src/i18n/content/seo.js`, `vite.config.js`, `docs/repair-manual.md`.

**Interfaces:** страница `/manual/`, query ID и hash соответствуют контракту задачи 4; работающие существующие маршруты сохраняются.

- [ ] Добавить `/manual` через `React.lazy(() => import('./pages/RepairManualPage'))` с локальной Suspense-обёрткой и понятной загрузкой. CSS просмотрщика импортировать из его модуля, чтобы не утяжелять остальные страницы.
- [ ] Добавить в `spaRoutes` значение `'manual'`; проверить, что сборка создаёт `dist/manual/index.html`. Добавить SEO `/manual` в обе локали. В базе знаний добавить карточку с названием руководства, объёмом «Зажигание · K14C · 11 материалов» и ссылкой `/manual/`.
- [ ] Выполнить проверки:

```powershell
npm run manual:test
npm run manual:check
npm run check:anchors
npm run build
git diff --check
```

- [ ] После сборки проверить существование оболочки, всех 11 JSON и ресурсов; в собранном главном чанке не должно быть полного текста руководства и XML-парсера. Проверить, что build и check не обращаются к Downloads/UnRAR.
- [ ] Запустить `npm run dev -- --host 127.0.0.1` и открыть `/zc33s/manual/?doc=AJPHSB0P1836001#T1H303`. Для браузерной работы использовать доступный навык Browser; если соединение восстановить нельзя, записать блок проверки и не подменять его предположениями.
- [ ] Проверить ширины 390/768/1440 px в обеих темах; наиболее насыщенная схема — документ `AJPHSB0P1834001`. Убедиться, что длинные таблицы прокручиваются внутри себя, а `document.documentElement.scrollWidth` не превышает viewport в 390 px.
- [ ] Пройти сценарии: поиск «свеч»; поиск фразы из тела; исходный ID; пустая выдача; открытие результата; следующая/предыдущая процедура; внутренний переход на `T1H303`; внешний к пробе ID; неизвестный ID; back/forward; reload прямого URL; быстрые последовательные переходы; повтор после ошибки запроса.
- [ ] Проверить Tab/Shift+Tab в оглавлении и диалоге, Escape, возврат фокуса, масштаб и исходный JPG. Проверить отказ буфера обмена и успешное копирование. Проверить печатный вид, включая единицы N·m, таблицу с объединениями и схему. Временные сбои API при проверке имитировать локально, не изменять публичный сайт.
- [ ] В `docs/repair-manual.md` записать точные итоги автоматических и визуальных проверок, размеры подготовленных данных, список целей за пределами пробы и ограничения JPG. Не объявлять полное руководство перенесённым. Сохранить коммит `feat: integrate repair manual pilot into knowledge hub`.

## Самопроверка плана

- Импорт, защита путей и сущности: задача 1.
- Содержимое, единицы, ссылки, дерево, таблицы и исходные ID: задача 2.
- Хеши, отчёт, ресурсы, повторяемость и независимость CI от RAR: задача 3.
- Поиск, URL и устаревшие ответы загрузки: задача 4.
- Адаптивность, темы, RU/EN оболочка, диалог, печать и ошибки: задача 5.
- Маршрут, база знаний, SEO, статическая оболочка и фактическая приёмка: задача 6.
- Полный перенос DTC, симптомов, всех моделей и PDF остаётся следующей стадией по согласованной спецификации.

## Исполнение после согласования

Рекомендуется **Native**: один исполнитель реализует этапы последовательно в этой сессии; XML-контракты, содержимое и renderer тесно связаны. После реализации — отдельная итоговая проверка по требованиям выбранного навыка исполнения. Альтернатива **Subagent-driven** — отдельные исполнители и проверки этапов с дополнительными затратами контекста. Пользователь должен прочитать план и выбрать способ до начала реализации.

Справка по XML DOM: [официальная документация xmldom](https://github.com/xmldom/xmldom). Это зависимость импортёра, не пользовательского просмотрщика.
