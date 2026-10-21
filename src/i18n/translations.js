// Словари интерфейса RU / EN.
// Ключи используются через t('header.logoAria') и т.п. в компонентах.

import { aboutContent } from './content/about.js';
import { warrantyContent } from './content/warranty.js';
import { consultationsContent } from './content/consultations.js';
import { seoContent } from './content/seo.js';
import { legalContent } from './content/legal.js';
import { privacyContent } from './content/privacy.js';
import { serviceContent } from './content/service.js';
import { catalogContent } from './content/catalog.js';
import { cardTranslations } from './cardTranslations.js';
import { enSectionIds, enDiagnosticsHtml, enDiagnosticsToc, enHardwareHtml, enHardwareToc, enFaqShortHtml, enFaqSelfHtml, enFaqFlashHtml, enFaqBuyHtml } from './knowledgeEn.js';
import faqShortRu, { sectionIds as shortIdsRu } from '../data/faqShort.js';
import faqSelfRu, { sectionIds as selfIdsRu } from '../data/faqSelfFlashing.js';
import faqFlashRu, { sectionIds as flashIdsRu } from '../data/faqFlashGuides.js';
import faqBuyRu, { sectionIds as buyIdsRu } from '../data/faqBuyGuide.js';

const ruDiagnosticsHtml = `
<p>Контроль параметров работы двигателя по логам — главный инструмент безопасного тюнинга K14C. Без инструментального анализа смеси, откатов зажигания и давления наддува эксплуатация форсированного двигателя создаёт риск термического повреждения поршневой группы или турбокомпрессора.</p>
<p><strong>1. AFR (Air-Fuel Ratio) — Соотношение воздух/топливо</strong></p><p>Штатный широкополосный датчик кислорода (лямбда-зонд) на ZC33S обеспечивает высокую точность измерений.</p><ul><li><strong>Холостой ход и частичные нагрузки (Closed Loop):</strong> лямбда 1.00 (AFR 14.7:1 на бензине). Обеспечивается экологичность и экономичность.</li><li><strong>Штатный режим полного газа (WOT, сток):</strong> AFR 11.8–12.2:1.</li><li><strong>Тюнинг Stage 1 / Stage 2 (GunRace):</strong> AFR 11.5–11.8:1 под высоким наддувом для охлаждения камеры сгорания испарённым топливом.</li><li><strong>Турбины GR30 / GR39 (Stage 3):</strong> AFR 11.2–11.5:1.</li><li>⚠️ <em>Критическое значение:</em> AFR беднее 12.5:1 при наддуве свыше 1.2 бар недопустимо — риск прогара поршня и перегрева выпускных клапанов.</li></ul>
<p><strong>2. Knock (Детонация и откаты УОЗ)</strong></p><p>ЭБУ Bosch MED17.9.63 постоянно анализирует сигнал датчика детонации и при возникновении микровзрывов производит откат угла опережения зажигания (Ignition Retard) индивидуально по каждому цилиндру.</p><ul><li><strong>Норма:</strong> 0.0° (откатов нет) во всём диапазоне оборотов под полной нагрузкой.</li><li><strong>Допустимо:</strong> кратковременные единичные откаты до -1.5°...-2.0° в момент резкого нажатия педали (Tip-in Knock).</li><li>⚠️ <em>Опасно:</em> системные откаты свыше -3.0° на оборотах 4000–6000 свидетельствуют о низком октановом числе бензина, неподходящих свечах или чрезмерном угле опережения. Эксплуатацию под нагрузкой необходимо прекратить до смены топлива или калибровки.</li></ul>
<p><strong>3. Boost — Давление наддува</strong></p><p>На ZC33S установлен датчик абсолютного давления (MAP), измеряющий давление во впускном коллекторе.</p><ul><li><strong>Заводской сток:</strong> пик 0.95–1.0 бар в середине, спад до 0.75–0.8 бар к 6000 об/мин.</li><li><strong>Stage 1 (АИ-95):</strong> пик 1.15–1.2 бар, спад до 0.85–0.9 бар на хвосте (6000 об/мин).</li><li><strong>Stage 2 (АИ-100):</strong> пик 1.25–1.3 бар, удержание 1.0–1.05 бар.</li><li><strong>Турбина GunRace GR30:</strong> рабочий наддув 1.4–1.55 бар.</li><li><strong>Турбина GunRace GR39:</strong> рабочий наддув 1.5–1.68 бар.</li></ul>
<p><strong>4. IAT (Intake Air Temperature) — Температура воздуха на впуске</strong></p><p>Замеряется датчиком в коллекторе после интеркулера (IAT post-IC).</p><ul><li><strong>Штатный кулер:</strong> при +25°C на улице температура на впуске уже на 3-й передаче подскакивает до +55...+65°C. При +60°C ЭБУ начинает аварийно откатывать угол зажигания и снижать наддув.</li><li><strong>Тюнинг-интеркулер (Bar & Plate 65–70 мм):</strong> превышение температуры над забортной не более +8...+14°C даже после нескольких ускорений подряд.</li><li><em>Вывод:</em> для любого уровня тюнинга выше базового Stage 1 замена интеркулера строго обязательна.</li></ul>
<p><strong>5. EGT (Exhaust Gas Temperature) — Температура выхлопных газов</strong></p><p>В блоке Bosch MED17.9.63 рассчитывается математическая модель EGT на основе расхода воздуха, оборотов, состава смеси и угла зажигания.</p><ul><li><strong>Безопасный рабочий диапазон:</strong> до 860°C.</li><li><strong>Максимально допустимый кратковременный пик:</strong> 900–910°C.</li><li>⚠️ <em>Опасная зона:</em> температура выше 920°C вызывает термическую деформацию крыльчатки турбины, выгорание катализатора и повреждение выпускных седел. Установка прямоточного даунпайпа снижает пиковый EGT в среднем на 40–60°C.</li></ul>
`;
const ruDiagnosticsToc = ['AFR (Air-Fuel Ratio) — Соотношение воздух/топливо','Knock (Детонация и откаты УОЗ)','Boost — Давление наддува','IAT (Intake Air Temperature) — Температура воздуха на впуске','EGT (Exhaust Gas Temperature) — Температура выхлопных газов'];
const ruHardwareHtml = `
<p>Сбалансированная доработка аппаратной части Suzuki Swift Sport ZC33S с двигателем K14C требует понимания пропускной способности и взаимосвязи всех компонентов впускного и выпускного трактов.</p>
<p><strong>1. Интеркулер (Intercooler)</strong></p><p>Штатный интеркулер ZC33S имеет крайне скромный рабочий объём и тонкое ядро. Уже после одного интенсивного разгона он нагревается, вызывая резкий скачок температуры впуска (IAT) до +60°C и выше.</p><ul><li><strong>Решение:</strong> установка цельноалюминиевого фронтального интеркулера с типом ядра Bar & Plate толщиной 65–70 мм.</li><li><strong>Результат:</strong> температура впуска стабилизируется на уровне +30...+38°C в летнюю жару, предотвращается детонация, наддув держится без просадок.</li></ul>
<p><strong>2. Даунпайп (Downpipe)</strong></p><p>Заводской катализатор расположен в непосредственной близости от горячей улитки турбокомпрессора, создавая значительное противодавление выхлопным газам и тепловую ловушку.</p><ul><li><strong>Варианты:</strong> прямоточный даунпайп (Decat, 63–70 мм) либо даунпайп со спортивным металлическим катализатором 200 cpsi.</li><li><strong>Результат:</strong> снижение температуры выхлопных газов (EGT) на 50°C, ускорение выхода турбины на буст (спул раньше на 200–300 об/мин), улучшение продувки цилиндров. Требует прошивки Евро-2.</li></ul>
<p><strong>3. Турбокомпрессоры (Турбины серии GunRace GR)</strong></p><p>Штатная турбина Mitsubishi TD025 эффективна до 175 л.с., далее её компрессорная и турбинная части становятся узким местом.</p><ul><li><strong>GunRace GR30:</strong> гибридная турбина со специально спроектированным компрессорным колесом увеличенного диаметра. Устанавливается болт-он в штатное место со штатным маслопроводом и охлаждением. Потенциал — до 215–220 л.с.</li><li><strong>GunRace GR39:</strong> увеличенный гибрид на базе TD02L с увеличенной горячей и холодной частью. Потенциал — 240+ л.с. Требует доработки впускного патрубка, увеличенного интеркулера и выхлопа.</li></ul>
<p><strong>4. Комплект сцепления</strong></p><p>Штатное сцепление механической коробки передач надёжно держит крутящий момент до 270–280 Н·м (уровень Stage 1 и мягкий Stage 2). При переходе на крутящий момент свыше 300 Н·м (турбины GR30/GR39) ресурс заводского диска резко сокращается.</p><ul><li><strong>Решение:</strong> усиленная корзина и органический диск SST повышенного трения либо металлокерамика для трека.</li><li><strong>Облегчённый маховик:</strong> снижает инерционную массу на 2.5–3.5 кг, давая молниеносный набор оборотов при перегазовках.</li></ul>
<p><strong>5. Свечи зажигания</strong></p><p>Высокий наддув требует более мощной искры и повышенной теплоотдачи свечи во избежание калильного зажигания.</p><ul><li><strong>Для стока и Stage 1:</strong> оригинальные NGK ILZKR7D8 (калильное число 7, зазор 0.8 мм) или рутениевые NGK RX LKR7ARX-P.</li><li><strong>Для Stage 2 и турбин GR:</strong> «холодные» спортивные свечи с калильным числом 8 — <em>NGK Racing Competition R2556G-8</em> (сток № 91975). Они эффективно отводят избыточное тепло от изолятора.</li></ul>
`;
const ruHardwareToc = ['Интеркулер (Intercooler)','Даунпайп (Downpipe)','Турбокомпрессоры (Турбины серии GunRace GR)','Комплект сцепления','Свечи зажигания'];

const ruKnowledgeArticles = [
  { slug: 'zc33s-faq', title: 'Краткое FAQ по авто', category: 'car', additionalCategories: ['hardware'], readingTime: '12 мин', summary: 'Регламенты планового ТО, заправочные объёмы, выбор моторного и трансмиссионного масла, свечи зажигания, тормозные колодки, фильтры и артикулы проверенных аналогов.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S (2017–2024), двигатель K14C Boosterjet, 6-МКПП / 6-АКПП (Япония, Европа)', note: 'Спецификации жидкостей и артикулы проверены на практике участниками сообщества.' }, toc: shortIdsRu, html: faqShortRu },
  { slug: 'ecu-flashing', title: 'Прошивка авто своими руками', category: 'ecu', additionalCategories: ['diagnostics'], readingTime: '9 мин', summary: 'Пошаговая инструкция по самостоятельной прошивке ЭБУ: выбор адаптера (Scanmatik, Tactrix), программаторы (PCMFlash), считывание стока, запись калибровки и протоколы безопасности.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, ЭБУ Bosch MED17.9.63, двигатель K14C (дорестайл DBA и рестайл 4BA)', note: 'Обязательно сохраняйте резервную копию стоковой заводской прошивки перед любыми операциями записи.' }, toc: selfIdsRu, html: faqSelfRu },
  { slug: 'tuning-stages', title: 'Гид по прошивкам и стадиям тюнинга', category: 'ecu', additionalCategories: ['hardware'], readingTime: '14 мин', summary: 'Подробный разбор стадий Stage 1, Stage 2, Stage 3/3+, библиотека калибровок GunRace, Alientech, Monster Sport, SWK, требования к октановому числу бензина и аппаратной части.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, двигатель K14C, МКПП / АКПП, бензин АИ-95 / АИ-98 / АИ-100', note: 'Софт подбирается строго под версию базового ПО в заводском ЭБУ автомобиля.' }, toc: flashIdsRu, html: faqFlashRu },
  { slug: 'buying-zc33s', title: 'Гайд по покупке Suzuki Swift Sport ZC33S', category: 'car', additionalCategories: ['diagnostics'], readingTime: '15 мин', summary: 'Отличия рестайлинга от дорестайлинга, типичные болячки (подушки двигателя, ЛКП, сетка банджо-болта турбины), диагностика радара Safety, чтение аукционного листа и звуки K14C.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S (DBA-ZC33S, 4BA-ZC33S), все рынки (JDM, Европа, Мексика)', note: 'Рекомендуется к обязательному прочтению перед осмотром или заказом автомобиля из Японии.' }, toc: buyIdsRu, html: faqBuyRu },
  { slug: 'diagnostics', title: 'Диагностика и параметры по логам: AFR, Knock, Boost, IAT, EGT', category: 'diagnostics', additionalCategories: ['ecu'], readingTime: '8 мин', summary: 'Практический справочник по ключевым параметрам безопасности: допустимый диапазон AFR, контроль откатов угла опережения зажигания, кривая наддува, температура впуска IAT и расчётный EGT.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, двигатель K14C Boosterjet, ЭБУ Bosch MED17.9.63', note: 'Параметры сняты и верифицированы на диностендах и в дорожных тестах на автомобилях SST.' }, toc: ruDiagnosticsToc, html: ruDiagnosticsHtml },
  { slug: 'hardware', title: 'Hardware: руководство по компонентам ZC33S', category: 'hardware', additionalCategories: ['car'], readingTime: '10 мин', summary: 'Подбор и совместимость основных компонентов: фронтальные интеркулеры, спортивные даунпайпы, гибридные турбины GunRace GR30/GR39, усиленное сцепление и свечи зажигания.', meta: { updated: 'Октябрь 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, двигатель K14C Boosterjet (все годы выпуска)', note: 'Все компоненты проверены на совместимость со штатным подкапотным пространством ZC33S.' }, toc: ruHardwareToc, html: ruHardwareHtml },
];

const enKnowledgeArticles = [
  { slug: 'zc33s-faq', title: 'ZC33S FAQ: Maintenance & OEM Parts Guide', category: 'car', additionalCategories: ['hardware'], readingTime: '12 min', summary: 'Scheduled maintenance, fluid capacities, engine and transmission oil, spark plugs, brake pads, filters and proven OEM equivalents for ZC33S.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S (2017–2024), K14C Boosterjet, 6-MT / 6-AT (Japan, Europe)', note: 'Fluid specs and part numbers verified in practice by community members.' }, toc: enSectionIds.faqShort, html: enFaqShortHtml },
  { slug: 'ecu-flashing', title: 'DIY ECU Flashing Guide', category: 'ecu', additionalCategories: ['diagnostics'], readingTime: '9 min', summary: 'Step-by-step DIY ECU flashing: choosing adapter (Scanmatik, Tactrix), flashers (PCMFlash), stock readout, calibration write and safety protocols.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, Bosch MED17.9.63 ECU, K14C (pre-facelift DBA and facelift 4BA)', note: 'Always keep a backup of stock factory calibration before any write operations.' }, toc: enSectionIds.selfFlash, html: enFaqSelfHtml },
  { slug: 'tuning-stages', title: 'Tuning Stages & Firmware Guide', category: 'ecu', additionalCategories: ['hardware'], readingTime: '14 min', summary: 'Detailed breakdown of Stage 1, Stage 2, Stage 3/3+, GunRace, Alientech, Monster Sport, SWK calibration library, fuel octane and hardware requirements.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, K14C, MT / AT, RON 95 / 98 / 100', note: 'Software is matched strictly to base ECU software version in the car.' }, toc: enSectionIds.flashGuides, html: enFaqFlashHtml },
  { slug: 'buying-zc33s', title: 'Buying Guide: Suzuki Swift Sport ZC33S', category: 'car', additionalCategories: ['diagnostics'], readingTime: '15 min', summary: 'Facelift vs pre-facelift differences, common issues (engine mounts, paint, turbo banjo mesh), Safety radar diagnostics, auction sheet reading and K14C sounds.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S (DBA-ZC33S, 4BA-ZC33S), all markets (JDM, Europe, Mexico)', note: 'Highly recommended to read before inspecting or ordering a car from Japan.' }, toc: enSectionIds.buyGuide, html: enFaqBuyHtml },
  { slug: 'diagnostics', title: 'Diagnostics & Log Parameters: AFR, Knock, Boost, IAT, EGT', category: 'diagnostics', additionalCategories: ['ecu'], readingTime: '8 min', summary: 'Practical reference for key safety parameters: AFR range, ignition retard monitoring, boost curve, intake temperature IAT and calculated EGT.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, K14C Boosterjet, Bosch MED17.9.63 ECU', note: 'Parameters taken and verified on dynos and road tests on SST cars.' }, toc: enDiagnosticsToc, html: enDiagnosticsHtml },
  { slug: 'hardware', title: 'Hardware: ZC33S Components Guide', category: 'hardware', additionalCategories: ['car'], readingTime: '10 min', summary: 'Selection and compatibility of core components: front-mount intercoolers, sport downpipes, GunRace GR30/GR39 hybrid turbos, upgraded clutch and spark plugs.', meta: { updated: 'October 2026', reviewer: 'GunRace', compatibility: 'Suzuki Swift Sport ZC33S, K14C Boosterjet (all years)', note: 'All components checked for compatibility with stock ZC33S engine bay.' }, toc: enHardwareToc, html: enHardwareHtml },
];

export const translations = {
  ru: {
    header: {
      logoAria: 'Swift Sport Tuning — Главная',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      mainNav: 'Основное меню',
      easterEggAlt: 'Инженерная пасхалка',
    },
    nav: {
      tuning: 'Прошивки',
      components: 'Компоненты',
      knowledge: 'База знаний',
      about: 'О проекте',
      service: 'Обслуживание',
      catalog: 'Каталог деталей',
    },
    cta: {
      discuss: 'Обсудить конфигурацию',
      discussAria: 'Обсудить конфигурацию в официальном Telegram',
      clarify: 'Уточнить применимость',
      openKnowledge: 'Открыть базу знаний →',
    },
    home: {
      heroTitle: 'SUZUKI SWIFT SPORT ZC33S',
      heroAccent: 'Tuning',
      heroSubtitle:
        'Прошивки, проверенные конфигурации и компоненты для Suzuki Swift Sport ZC33S. Практическая база по настройке, обслуживанию и эксплуатации автомобиля.',
      heroCtaNote: 'Сайт не оформляет заказы и не принимает платежи.',
      heroCtaNoteLong: 'Цены и характеристики приведены для справки; они не подтверждают наличие компонента или возможность оформить заказ через сайт. Сайт не оформляет заказы и не принимает платежи.',
      levels: {
        eyebrow: 'Гид по уровням',
        title: 'Уровни тюнинга',
        lead: 'Четыре уровня конфигурации: какие узлы меняются, какое топливо требуется и какую мощность ориентировочно даёт каждый шаг.',
        note: 'Фактические показатели зависят от состояния автомобиля, состава оборудования, топлива, условий окружающей среды и индивидуальной настройки ECU.',
        table: {
          level: 'Уровень',
          config: 'Конфигурация',
          fuel: 'Топливо',
          power: 'Мощность, ориентировочно',
          powerCaption: 'Мощность, ориентировочно',
        },
        powerUnit: 'л.с.',
        upTo: 'до',
        items: [
          {
            id: 'stage-1',
            name: 'Stage 1',
            tag: 'Daily',
            config: ['Стоковая конфигурация'],
            fuel: 'АИ-95',
            fuelNote: '',
            powerPrefix: 'до',
            power: '165',
            powerValue: 165,
          },
          {
            id: 'stage-2',
            name: 'Stage 2',
            tag: '',
            config: ['Увеличенный интеркулер', 'Даунпайп'],
            fuel: 'АИ-100/102',
            fuelNote: '',
            powerPrefix: 'до',
            power: '175',
            powerValue: 175,
          },
          {
            id: 'gr30',
            name: 'GR30',
            tag: '',
            config: ['Гибридная турбина', 'Сопутствующие доработки'],
            fuel: 'АИ-95 / АИ-100',
            fuelNote: 'в зависимости от калибровки',
            powerPrefix: 'до',
            power: '215–220',
            powerValue: 220,
          },
          {
            id: 'gr39',
            name: 'GR39',
            tag: '',
            config: ['Расширенная аппаратная конфигурация', 'Индивидуальная настройка'],
            fuel: 'АИ-100+',
            fuelNote: '',
            powerPrefix: '',
            power: '240+',
            powerValue: 240,
          },
        ],
      },
      contacts: {
        title: 'Контакты',
        allRussia: 'Всероссийский чат',
        tuning: 'Чат по тюнингу',
      },
      sections: {
        tuning: {
          title: 'Прошивки',
          desc: 'Stage 1, Stage 2 и индивидуальные калибровки ECU.',
        },
        components: {
          title: 'Компоненты',
          desc: 'Турбины, интеркулеры, сцепление и другие компоненты для проверенных конфигураций.',
        },
        knowledge: {
          title: 'База знаний',
          desc: 'Эксплуатация, настройка, прошивка, обслуживание и выбор автомобиля.',
        },
        about: {
          title: 'О проекте',
          desc: 'Инженерный подход, история SST, разработки GunRace и принципы тестирования.',
        },
        service: {
          title: 'Обслуживание',
          desc: 'Диагностика, регламентное обслуживание и подготовка автомобиля к тюнингу.',
        },
      },
    },
    footer: {
      brandDesc: 'Независимый проект, посвящённый Suzuki Swift Sport ZC33S.',
      sections: 'Разделы',
      info: 'Информация',
      legalHeading: 'Правовая информация',
      contacts: 'Контакты',
      consultations: 'Консультации и информация о компонентах',
      warranty: 'Гарантийная информация производителей',
      privacy: 'Политика обработки персональных данных',
      legalInfo: 'Правовая информация',
      telegram: 'Telegram-канал',
      copyright: 'Swift Sport Tuning. Все права защищены.',
      disclaimer:
        'Сайт — информационный каталог: заказы и платежи через сайт не принимаются. Фотографии и цены сами по себе не определяют правовой статус конкретных отношений.',
    },
    tuning: {
      title: 'Прошивки',
      lead: 'Варианты прошивок для Suzuki Swift Sport ZC33S: ориентировочная стоимость, требования к конфигурации и расчётная мощность. Результат зависит от конфигурации автомобиля, топлива и состояния узлов.',
      note: 'Технические характеристики и ориентировочная стоимость приведены для справки. Сайт не оформляет заказы и не принимает платежи.',
      overviewAlt:
        'Сравнение уровней тюнинга GunRace для Suzuki Swift Sport ZC33S: пиковая мощность и момент Stage 1, Stage 2, GR30 и GR39 и графики мощности и момента.',
      overviewCaption:
        'Сводка замеров на диностенде: Stage 1 — 166,6 л.с. и 219,5 Н·м, Stage 2 — 184,1 л.с. и 304,7 Н·м, GR30 — 220,4 л.с. и 324,3 Н·м, GR39 — 244,8 л.с. и 386,0 Н·м.',
      empty:
        'Спецификации и графики конфигураций формируются на основе измерений и логов. Ознакомьтесь с подробными материалами по калибровкам K14C в Базе знаний или задайте технический вопрос в Telegram.',
      gridNote:
        'Значения мощности — ориентировочные расчётные показатели. Технические данные и цены в карточках приведены для справки и не подтверждают наличие компонента или оформление заказа на сайте.',
    },
    custom: {
      title: 'Компоненты',
      lead: 'Компоненты для Suzuki Swift Sport ZC33S: турбины, интеркулеры, сцепление. Технические характеристики и ориентировочные цены приведены для справки.',
      note: 'Кнопка предназначена для технических консультаций. Сайт не оформляет заказы и не принимает платежи.',
      empty:
        'Спецификации компонентов приведены для ознакомления и формируются на основе испытаний и опыта эксплуатации. Изучите материалы о компонентах в Базе знаний или задайте технический вопрос в Telegram.',
    },
    knowledge: {
      title: 'База знаний',
      lead: 'Практическая техническая база по Suzuki Swift Sport ZC33S: обслуживание, калибровки блока управления, подбор компонентов, диагностика по логам и выбор автомобиля.',
      categoriesTitle: 'Тематические разделы',
      filterLabel: 'Категория:',
      openMaterial: 'Открыть материал →',
      updated: 'Обновлено:',
      reviewedBy: 'Проверил:',
      compatibility: 'Применимость:',
      compatibilityNote: '',
      readingTime: 'мин',
      categories: {
        all: 'Все материалы',
        car: 'Автомобиль',
        ecu: 'ECU',
        hardware: 'Hardware',
        diagnostics: 'Диагностика',
      },
      categoryDesc: {
        car: 'Конструкция, плановое ТО, заправочные объёмы, регламенты, слабые места и проверка перед покупкой.',
        ecu: 'Калибровки блока управления двигателем, уровни наддува, софт, программаторы и требования к топливу.',
        hardware: 'Тюнинг-компоненты: турбокомпрессоры GunRace GR, охлаждение наддува, выпуск и усиление трансмиссии.',
        diagnostics: 'Контроль параметров работы двигателя по логам, допустимые значения и предотвращение повреждений.',
      },
      categoryTopics: {
        car: ['Особенности ZC33S', 'Обслуживание', 'Типовые неисправности', 'Покупка автомобиля'],
        ecu: ['Stage 1', 'Stage 2', 'Самостоятельная прошивка', 'Логирование', 'Топливо'],
        hardware: ['Интеркулер', 'Downpipe', 'Турбины', 'Сцепление', 'Свечи'],
        diagnostics: ['AFR', 'Knock', 'Boost', 'IAT', 'EGT'],
      },
      articleBack: '← Вернуться к базе знаний',
      allMaterials: '← Все материалы базы знаний',
      tocTitle: 'Содержание статьи',
      notFoundNote: 'Не нашли ответ на свой вопрос? Задайте его напрямую в официальном Telegram-чате проекта.',
      articles: ruKnowledgeArticles,
    },
    about: aboutContent.ru,
    warranty: warrantyContent.ru,
    consultations: consultationsContent.ru,
    service: serviceContent.ru,
    legal: legalContent.ru,
    privacy: privacyContent.ru,
    seo: seoContent.ru,
    catalog: catalogContent.ru,
    cards: cardTranslations,
    siteConfig: {
      telegramUrl: 'https://t.me/+1hplL5z7qHo4Nzdi',
      ctaLabel: 'Обсудить конфигурацию',
      catalogDisclaimer: 'Сайт является информационным каталогом проекта Swift Sport Tuning. Технические характеристики, описания, варианты конфигураций и ориентировочные цены приведены для предварительного ознакомления. Сайт не оформляет заказы и не принимает платежи. Кнопка связи предназначена для консультаций.',
      privacyNote: 'Персональные данные на сайте не собираются: корзина, онлайн-оплата, регистрация, личный кабинет, формы заказа и обратной связи отсутствуют, обязательный ввод телефона, e-mail и VIN не требуется, маркетинговые трекеры не подключены. Локальное хранилище браузера используется только для того, чтобы возвращать вас к прочитанному разделу FAQ.',
      priceLabel: 'Ориентировочная стоимость',
      priceFallback: 'Справочная цена не указана',
      priceNote: 'Цены и характеристики приведены для справки; они не подтверждают наличие компонента или возможность оформить заказ через сайт.',
      powerNote: 'Расчётная мощность. Результат зависит от конфигурации автомобиля, топлива и состояния узлов.',
      productPriceNote: 'Указанная цена ориентировочная и приведена для справки. Проверяйте актуальные сведения и условия изготовителя по документации конкретного изделия.',
      importantNote: 'Изменение программного обеспечения ECU и установка тюнинг-компонентов могут изменять мощностные, экологические и эксплуатационные характеристики автомобиля. Некоторые изменения могут требовать соблюдения установленного порядка внесения изменений в конструкцию транспортного средства. Владелец автомобиля обязан учитывать требования законодательства и технических регламентов, применимые к выбранной конфигурации.',
      importantTitle: 'Важно',
      powerCalcNote: 'Показатель является расчётным и не заменяет измеренный результат конкретного автомобиля.',
      powerTestNote: 'Измеренный результат конкретного автомобиля при указанных условиях. Не является гарантией аналогичного показателя на другом автомобиле.',
      powerTestTitle: 'Результат тестового автомобиля',
      warrantyPath: '/warranty',
      warrantyMoreLabel: 'Справка',
      consultationsPath: '/consultations',
      consultationsTitle: 'Консультации и информация о компонентах',
      backToHome: '← На главную',
      backToMain: '← Вернуться на главную',
      contents: 'Содержание',
    },
    faq: {
      modules: [
        { number: '01', title: 'Краткое FAQ по авто', text: 'Ответы на основные вопросы о Suzuki Swift Sport: обслуживание, надёжность, особенности эксплуатации и подготовка автомобиля.' },
        { number: '02', title: 'Прошивка авто своими руками', text: 'Пошаговый материал о подготовке автомобиля, необходимом оборудовании, мерах безопасности и порядке самостоятельной прошивки.' },
        { number: '03', title: 'Гид по прошивкам', text: 'Разбираем виды прошивок, отличия между конфигурациями, ожидаемый результат и выбор решения под конкретные задачи.' },
        { number: '04', title: 'Гайд по покупке', text: 'Практические рекомендации по выбору Suzuki Swift Sport: проверка состояния, документов, истории обслуживания и тюнинга.' },
      ],
      openSection: 'Открыть раздел',
      loading: 'Загрузка материала…',
      backToKnowledge: '← Вернуться к базе знаний',
      sectionsTitle: 'Разделы статьи',
      tableOfContents: 'Оглавление',
    },
    articleMeta: { updated: 'Обновлено:', reviewer: 'Проверил:', compatibility: 'Применимость:', note: '', toTop: 'Наверх', metaLabel: 'Метаданные материала' },
    notFound: {
      title: 'Страница не найдена',
      text: 'Возможно, материал был перемещён. Перейдите на главную или откройте базу знаний.',
      toHome: 'На главную',
      toKnowledge: 'База знаний',
    },
    product: {
      specs: 'Основные характеристики',
      power: 'Ориентировочная мощность',
      powerCalcNote: 'Показатель является расчётным и не заменяет измеренный результат конкретного автомобиля.',
      requirements: 'Требования к конфигурации',
      required: 'Обязательно',
      recommended: 'Рекомендуется',
      included: 'Входит в стоимость',
      variants: 'Варианты исполнения',
      warranty: 'Гарантийная информация',
      warrantyTerm: 'Срок, указанный в каталоге:',
      warrantyNote: 'Условия гарантии и ответственное лицо проверяйте в документах на изделие.',
      warrantyMore: 'Справка',
      testTitle: 'Результат тестового автомобиля',
      testNote: 'Измеренный результат конкретного автомобиля при указанных условиях. Не является гарантией аналогичного показателя на другом автомобиле.',
      important: 'Важно',
      importantNote:
        'Изменение программного обеспечения ECU и установка тюнинг-компонентов могут изменять мощностные, экологические и эксплуатационные характеристики автомобиля. Некоторые изменения могут требовать соблюдения установленного порядка внесения изменений в конструкцию транспортного средства. Владелец автомобиля обязан учитывать требования законодательства и технических регламентов, применимые к выбранной конфигурации.',
      priceLabel: 'Ориентировочная стоимость',
      priceFallback: 'Справочная цена не указана',
      priceNote:
        'Цены и характеристики приведены для справки; они не подтверждают наличие компонента или возможность оформить заказ через сайт.',
      productPriceNote:
        'Указанная цена ориентировочная и приведена для справки. Проверяйте актуальные сведения и условия изготовителя по документации конкретного изделия.',
      powerNote: 'Расчётная мощность. Результат зависит от конфигурации автомобиля, топлива и состояния узлов.',
      noImage: 'Нет изображения',
      more: 'Подробнее',
      close: 'Закрыть',
      prevImage: 'Предыдущее изображение',
      nextImage: 'Следующее изображение',
      photoOf: 'Фото',
      of: 'из',
      for: 'для',
      thumbnailFor: 'Миниатюра',
      openCard: 'Открыть карточку',
    },
    language: {
      ru: 'RU',
      en: 'EN',
      aria: 'Выбор языка',
      switchToRu: 'Переключить на русский',
      switchToEn: 'Switch to English',
    },
    common: {
      priceLabel: 'Ориентировочная стоимость',
      priceFallback: 'Справочная цена не указана',
    },
  },
  en: {
    header: {
      logoAria: 'Swift Sport Tuning — Home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      mainNav: 'Main navigation',
      easterEggAlt: 'Engineering easter egg',
    },
    nav: {
      tuning: 'ECU Tunes',
      components: 'Components',
      knowledge: 'Knowledge Base',
      about: 'About',
      service: 'Service',
      catalog: 'Parts Catalog',
    },
    cta: {
      discuss: 'Discuss Build',
      discussAria: 'Discuss build in official Telegram',
      clarify: 'Check compatibility',
      openKnowledge: 'Open knowledge base →',
    },
    home: {
      heroTitle: 'SUZUKI SWIFT SPORT ZC33S',
      heroAccent: 'Tuning',
      heroSubtitle:
        'ECU tunes, proven configurations and components for Suzuki Swift Sport ZC33S. Practical knowledge base for setup, maintenance and ownership.',
      heroCtaNote: 'The site does not process orders or accept payments.',
      heroCtaNoteLong:
        'Prices and specs are for reference only and do not confirm availability or ability to order via the website. The site does not process orders or payments.',
      levels: {
        eyebrow: 'Level guide',
        title: 'Tuning Levels',
        lead: 'Four configuration levels: what changes, what fuel is required and what power each step delivers (approx).',
        note: 'Actual figures depend on vehicle condition, hardware, fuel, ambient conditions and ECU calibration.',
        table: {
          level: 'Level',
          config: 'Configuration',
          fuel: 'Fuel',
          power: 'Power, approx.',
          powerCaption: 'Power, approx.',
        },
        powerUnit: 'hp',
        upTo: 'up to',
        items: [
          {
            id: 'stage-1',
            name: 'Stage 1',
            tag: 'Daily',
            config: ['Stock configuration'],
            fuel: 'AI-95',
            fuelNote: '',
            powerPrefix: 'up to',
            power: '165',
            powerValue: 165,
          },
          {
            id: 'stage-2',
            name: 'Stage 2',
            tag: '',
            config: ['Upgraded intercooler', 'Downpipe'],
            fuel: 'AI-100/102',
            fuelNote: '',
            powerPrefix: 'up to',
            power: '175',
            powerValue: 175,
          },
          {
            id: 'gr30',
            name: 'GR30',
            tag: '',
            config: ['Hybrid turbo', 'Supporting mods'],
            fuel: 'AI-95 / AI-100',
            fuelNote: 'depending on calibration',
            powerPrefix: 'up to',
            power: '215–220',
            powerValue: 220,
          },
          {
            id: 'gr39',
            name: 'GR39',
            tag: '',
            config: ['Extensive hardware', 'Custom tune'],
            fuel: 'AI-100+',
            fuelNote: '',
            powerPrefix: '',
            power: '240+',
            powerValue: 240,
          },
        ],
      },
      contacts: {
        title: 'Contacts',
        allRussia: 'All-Russia Chat',
        tuning: 'Tuning Chat',
      },
      sections: {
        tuning: {
          title: 'ECU Tunes',
          desc: 'Stage 1, Stage 2 and custom ECU calibrations.',
        },
        components: {
          title: 'Components',
          desc: 'Turbos, intercoolers, clutch and other parts for proven configurations.',
        },
        knowledge: {
          title: 'Knowledge Base',
          desc: 'Operation, tuning, flashing, maintenance and buying guide.',
        },
        about: {
          title: 'About',
          desc: 'Engineering approach, SST history, GunRace developments and testing principles.',
        },
        service: {
          title: 'Service',
          desc: 'Diagnostics, routine maintenance and preparation for tuning.',
        },
      },
    },
    footer: {
      brandDesc: 'Independent project dedicated to Suzuki Swift Sport ZC33S.',
      sections: 'Sections',
      info: 'Information',
      legalHeading: 'Legal Information',
      contacts: 'Contacts',
      consultations: 'Consultations & component info',
      warranty: 'Manufacturer warranty info',
      privacy: 'Privacy Policy',
      legalInfo: 'Legal Information',
      telegram: 'Telegram Channel',
      copyright: 'Swift Sport Tuning. All rights reserved.',
      disclaimer:
        'This site is an informational catalog: orders and payments are not processed via the website. Photos and prices alone do not determine the legal status of any specific relationship.',
    },
    tuning: {
      title: 'ECU Tunes',
      lead: 'ECU tune options for Suzuki Swift Sport ZC33S: indicative pricing, hardware requirements and estimated power. Results depend on vehicle configuration, fuel and component condition.',
      note: 'Specs and indicative prices are for reference only. The site does not process orders or accept payments.',
      overviewAlt:
        'GunRace tuning levels comparison for Suzuki Swift Sport ZC33S: peak power and torque of Stage 1, Stage 2, GR30 and GR39 with power and torque curves.',
      overviewCaption:
        'Dyno summary: Stage 1 — 166.6 hp and 219.5 Nm, Stage 2 — 184.1 hp and 304.7 Nm, GR30 — 220.4 hp and 324.3 Nm, GR39 — 244.8 hp and 386.0 Nm.',
      empty:
        'Specifications and graphs are based on measurements and logs. Explore detailed K14C calibration materials in the Knowledge Base or ask a technical question on Telegram.',
      gridNote:
        'Power figures are estimated calculations. Specs and prices in cards are for reference only and do not confirm availability or order placement on the site.',
    },
    custom: {
      title: 'Components',
      lead: 'Components for Suzuki Swift Sport ZC33S: turbos, intercoolers, clutch. Specs and indicative prices are for reference.',
      note: 'The button is for technical consultations. The site does not process orders or accept payments.',
      empty:
        'Component specs are for reference and based on testing and operational experience. Explore materials in the Knowledge Base or ask a technical question on Telegram.',
    },
    knowledge: {
      title: 'Knowledge Base',
      lead: 'Practical technical knowledge base for Suzuki Swift Sport ZC33S: maintenance, ECU calibration, component selection, log diagnostics and buying guide.',
      categoriesTitle: 'Categories',
      filterLabel: 'Category:',
      openMaterial: 'Open article →',
      updated: 'Updated:',
      reviewedBy: 'Reviewed by:',
      compatibility: 'Compatibility:',
      readingTime: 'min',
      categories: {
        all: 'All articles',
        car: 'Car',
        ecu: 'ECU',
        hardware: 'Hardware',
        diagnostics: 'Diagnostics',
      },
      categoryDesc: {
        car: 'Design, maintenance schedule, fluid capacities, service intervals, common issues and pre-purchase inspection.',
        ecu: 'ECU calibrations, boost levels, software, programmers and fuel requirements.',
        hardware: 'Tuning components: GunRace GR turbochargers, charge cooling, exhaust and transmission upgrades.',
        diagnostics: 'Monitoring engine parameters from logs, safe limits and damage prevention.',
      },
      categoryTopics: {
        car: ['ZC33S specifics', 'Maintenance', 'Common issues', 'Buying guide'],
        ecu: ['Stage 1', 'Stage 2', 'DIY flashing', 'Logging', 'Fuel'],
        hardware: ['Intercooler', 'Downpipe', 'Turbos', 'Clutch', 'Spark plugs'],
        diagnostics: ['AFR', 'Knock', 'Boost', 'IAT', 'EGT'],
      },
      articleBack: '← Back to Knowledge Base',
      allMaterials: '← All Knowledge Base articles',
      tocTitle: 'Article contents',
      notFoundNote: 'Didn’t find the answer? Ask directly in the official Telegram chat.',
      articles: enKnowledgeArticles,
    },
    about: aboutContent.en,
    warranty: warrantyContent.en,
    consultations: consultationsContent.en,
    service: serviceContent.en,
    legal: legalContent.en,
    privacy: privacyContent.en,
    seo: seoContent.en,
    catalog: catalogContent.en,
    cards: cardTranslations,
    siteConfig: {
      telegramUrl: 'https://t.me/+1hplL5z7qHo4Nzdi',
      ctaLabel: 'Discuss Build',
      catalogDisclaimer: 'The site is an informational catalog of the Swift Sport Tuning project. Specs, descriptions, configurations and indicative prices are for preliminary review. The site does not process orders or payments. The contact button is for consultations.',
      privacyNote: 'No personal data is collected: no cart, payment, registration, account, order forms, mandatory phone/email/VIN, no marketing trackers. LocalStorage is used only to return you to your reading position in FAQ.',
      priceLabel: 'Indicative price',
      priceFallback: 'Reference price not specified',
      priceNote: 'Prices and specs are for reference; they do not confirm component availability or ability to order via the site.',
      powerNote: 'Estimated power. Result depends on car configuration, fuel and component condition.',
      productPriceNote: 'Price is indicative for reference. Check current manufacturer documentation for terms.',
      importantNote: 'ECU software changes and tuning components may alter power, emissions and operational characteristics. Some modifications may require compliance with vehicle modification procedures. The owner must consider applicable laws and regulations for the chosen configuration.',
      importantTitle: 'Important',
      powerCalcNote: 'This is an estimated figure and does not replace a measured result for a specific vehicle.',
      powerTestNote: 'Measured result for a specific vehicle under stated conditions. Not a guarantee for another vehicle.',
      powerTestTitle: 'Test Vehicle Result',
      warrantyPath: '/warranty',
      warrantyMoreLabel: 'Details',
      consultationsPath: '/consultations',
      consultationsTitle: 'Consultations & Component Info',
      backToHome: '← Home',
      backToMain: '← Back to home',
      contents: 'Contents',
    },
    faq: {
      modules: [
        { number: '01', title: 'Quick Car FAQ', text: 'Answers to key questions about Suzuki Swift Sport: maintenance, reliability, operation and preparation.' },
        { number: '02', title: 'DIY ECU Flashing', text: 'Step-by-step guide to car preparation, required equipment, safety measures and DIY flashing procedure.' },
        { number: '03', title: 'Firmware Guide', text: 'Types of tunes, differences between configurations, expected results and choosing solution for your needs.' },
        { number: '04', title: 'Buying Guide', text: 'Practical recommendations for choosing Suzuki Swift Sport: condition check, documents, service history and tuning.' },
      ],
      openSection: 'Open section',
      loading: 'Loading content…',
      backToKnowledge: '← Back to knowledge base',
      sectionsTitle: 'Article sections',
      tableOfContents: 'Table of contents',
    },
    articleMeta: { updated: 'Updated:', reviewer: 'Reviewed by:', compatibility: 'Compatibility:', note: '', toTop: 'Back to top', metaLabel: 'Article metadata' },
    notFound: {
      title: 'Page not found',
      text: 'The material may have been moved. Go to the homepage or open the knowledge base.',
      toHome: 'Home',
      toKnowledge: 'Knowledge Base',
    },
    product: {
      specs: 'Key specifications',
      power: 'Estimated power',
      powerCalcNote: 'This is an estimated figure and does not replace a measured result for a specific vehicle.',
      requirements: 'Configuration requirements',
      required: 'Required',
      recommended: 'Recommended',
      included: 'Included',
      variants: 'Options',
      warranty: 'Warranty information',
      warrantyTerm: 'Catalog term:',
      warrantyNote: 'Check the product documents for warranty terms and responsible party.',
      warrantyMore: 'Details',
      testTitle: 'Test vehicle result',
      testNote: 'Measured result for a specific vehicle under stated conditions. Not a guarantee for another vehicle.',
      important: 'Important',
      importantNote:
        'ECU software changes and tuning components may alter power, emissions and operational characteristics. Some modifications may require compliance with established procedures for vehicle construction changes. The vehicle owner must consider applicable laws and technical regulations for the chosen configuration.',
      priceLabel: 'Indicative price',
      priceFallback: 'Reference price not specified',
      priceNote: 'Prices and specs are for reference; they do not confirm component availability or ability to order via the site.',
      productPriceNote:
        'The price is indicative and for reference only. Check current information and manufacturer terms in the specific product documentation.',
      powerNote: 'Estimated power. Result depends on vehicle configuration, fuel and component condition.',
      noImage: 'No image',
      more: 'Details',
      close: 'Close',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      photoOf: 'Photo',
      of: 'of',
      for: 'for',
      thumbnailFor: 'Thumbnail',
      openCard: 'Open card',
    },
    language: {
      ru: 'RU',
      en: 'EN',
      aria: 'Language selection',
      switchToRu: 'Switch to Russian',
      switchToEn: 'Switch to English',
    },
    common: {
      priceLabel: 'Indicative price',
      priceFallback: 'Reference price not specified',
    },
  },
};
