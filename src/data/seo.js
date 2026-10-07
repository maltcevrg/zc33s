// Единый реестр метаданных для поисковой оптимизации (SEO) и Open Graph.
// Используется как при динамической смене страниц в React SPA,
// так и при генерации статических HTML-оболочек при сборке.

export const SITE_URL = 'https://maltcevrg.github.io/zc33s';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/main_page-1920.jpg`;

export const SEO_DATA = {
  '/': {
    title: 'Suzuki Swift Sport ZC33S — тюнинг, прошивки и компоненты | SST',
    description:
      'Прошивки, турбины, интеркулеры, сцепление и техническая база по Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 и GR39.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Suzuki Swift Sport ZC33S — тюнинг, прошивки и компоненты | SST',
    ogDescription:
      'Прошивки, турбины, интеркулеры, сцепление и техническая база по Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 и GR39.',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
  '/tuning': {
    title: 'Прошивки Suzuki Swift Sport ZC33S — Stage 1 и Stage 2 | SST',
    description:
      'Калибровки блока управления Bosch MED17.9.63 для двигателя K14C: Stage 1, Stage 2, индивидуальная настройка под бензин АИ-95, АИ-98 и АИ-100.',
    canonical: `${SITE_URL}/tuning`,
    ogTitle: 'Прошивки Suzuki Swift Sport ZC33S — Stage 1 и Stage 2 | SST',
    ogDescription:
      'Калибровки блока управления Bosch MED17.9.63 для двигателя K14C: Stage 1, Stage 2, индивидуальная настройка под бензин АИ-95, АИ-98 и АИ-100.',
    ogImage: `${SITE_URL}/images/dyno-1280.jpg`,
  },
  '/custom': {
    title: 'Тюнинг-компоненты Suzuki Swift Sport ZC33S | SST',
    description:
      'Турбины GunRace серии GR, фронтальные интеркулеры, даунпайпы, усиленное сцепление и проверенные детали для Suzuki Swift Sport ZC33S.',
    canonical: `${SITE_URL}/custom`,
    ogTitle: 'Тюнинг-компоненты Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Турбины GunRace серии GR, фронтальные интеркулеры, даунпайпы, усиленное сцепление и проверенные детали для Suzuki Swift Sport ZC33S.',
    ogImage: `${SITE_URL}/images/turbo-960.jpg`,
  },
  '/knowledge': {
    title: 'База знаний Suzuki Swift Sport ZC33S | SST',
    description:
      'Техническая энциклопедия по Suzuki Swift Sport ZC33S: регламенты ТО, самостоятельная прошивка ECU, обзор стейджей, выбор авто, диагностика по логам и железо.',
    canonical: `${SITE_URL}/knowledge`,
    ogTitle: 'База знаний Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Техническая энциклопедия по Suzuki Swift Sport ZC33S: регламенты ТО, самостоятельная прошивка ECU, обзор стейджей, выбор авто, диагностика по логам и железо.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/zc33s-faq': {
    title: 'Краткое FAQ по авто Suzuki Swift Sport ZC33S | SST',
    description:
      'Регламенты планового ТО, заправочные объёмы, выбор моторного и трансмиссионного масла, свечи зажигания, тормозные колодки, фильтры и артикулы проверенных аналогов.',
    canonical: `${SITE_URL}/knowledge/zc33s-faq`,
    ogTitle: 'Краткое FAQ по авто Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Регламенты планового ТО, заправочные объёмы, выбор моторного и трансмиссионного масла, свечи зажигания, тормозные колодки, фильтры и артикулы проверенных аналогов.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/ecu-flashing': {
    title: 'Самостоятельная прошивка ECU Suzuki Swift Sport ZC33S | SST',
    description:
      'Инструкция по прошивке блока Bosch MED17.9.63: оборудование SM2 Pro J2534, распиновка разъёмов T60/T94, модуль 71 PCMflash, чтение и запись калибровок.',
    canonical: `${SITE_URL}/knowledge/ecu-flashing`,
    ogTitle: 'Самостоятельная прошивка ECU Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Инструкция по прошивке блока Bosch MED17.9.63: оборудование SM2 Pro J2534, распиновка разъёмов T60/T94, модуль 71 PCMflash, чтение и запись калибровок.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/tuning-stages': {
    title: 'Обзор стейджей тюнинга Suzuki Swift Sport ZC33S | SST',
    description:
      'Подробный разбор Stage 1, Stage 2 и Stage 3 с гибридными турбинами GunRace: требования к железу, ожидаемая мощность, топливо и ресурс.',
    canonical: `${SITE_URL}/knowledge/tuning-stages`,
    ogTitle: 'Обзор стейджей тюнинга Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Подробный разбор Stage 1, Stage 2 и Stage 3 с гибридными турбинами GunRace: требования к железу, ожидаемая мощность, топливо и ресурс.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/buying-zc33s': {
    title: 'Выбор и покупка Suzuki Swift Sport ZC33S | SST',
    description:
      'Чек-лист перед покупкой Swift Sport ZC33S: проверка турбины, интеркулера, следов ударов, состояния ЛКП, аукционного листа и компьютерная диагностика.',
    canonical: `${SITE_URL}/knowledge/buying-zc33s`,
    ogTitle: 'Выбор и покупка Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Чек-лист перед покупкой Swift Sport ZC33S: проверка турбины, интеркулера, следов ударов, состояния ЛКП, аукционного листа и компьютерная диагностика.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/diagnostics': {
    title: 'Диагностика и параметры по логам K14C: AFR, Knock, Boost, IAT, EGT | SST',
    description:
      'Инженерные параметры для оценки безопасности и эффективности калибровок K14C: смесь AFR, детонация Knock, давление Boost, температура впуска IAT и выхлопа EGT.',
    canonical: `${SITE_URL}/knowledge/diagnostics`,
    ogTitle: 'Диагностика и параметры по логам K14C: AFR, Knock, Boost, IAT, EGT | SST',
    ogDescription:
      'Инженерные параметры для оценки безопасности и эффективности калибровок K14C: смесь AFR, детонация Knock, давление Boost, температура впуска IAT и выхлопа EGT.',
    ogImage: `${SITE_URL}/images/baza-1280.jpg`,
  },
  '/knowledge/hardware': {
    title: 'Тюнинг железа K14C: интеркулер, даунпайп, турбины GunRace, сцепление, свечи | SST',
    description:
      'Аппаратные компоненты для Swift Sport ZC33S: выбор интеркулера Bar & Plate, даунпайпа Decat/200 cpsi, турбин GunRace GR30/GR39, усиленного сцепления и свечей.',
    canonical: `${SITE_URL}/knowledge/hardware`,
    ogTitle: 'Тюнинг железа K14C: интеркулер, даунпайп, турбины GunRace, сцепление, свечи | SST',
    ogDescription:
      'Аппаратные компоненты для Swift Sport ZC33S: выбор интеркулера Bar & Plate, даунпайпа Decat/200 cpsi, турбин GunRace GR30/GR39, усиленного сцепления и свечей.',
    ogImage: `${SITE_URL}/images/turbo-960.jpg`,
  },
  '/about': {
    title: 'О проекте Swift Sport Tuning и разработчике GunRace | SST',
    description:
      'История создания SST, инженерный подход к тюнингу Suzuki Swift Sport ZC33S, компетенции калибровщика GunRace и методология логов и испытаний.',
    canonical: `${SITE_URL}/about`,
    ogTitle: 'О проекте Swift Sport Tuning и разработчике GunRace | SST',
    ogDescription:
      'История создания SST, инженерный подход к тюнингу Suzuki Swift Sport ZC33S, компетенции калибровщика GunRace и методология логов и испытаний.',
    ogImage: `${SITE_URL}/images/gunrace.jpg`,
  },
  '/purchase': {
    title: 'Условия приобретения, оплата и доставка | SST',
    description:
      'Порядок согласования конфигурации, ориентировочные цены, условия оплаты, доставка транспортными компаниями по РФ и СНГ.',
    canonical: `${SITE_URL}/purchase`,
    ogTitle: 'Условия приобретения, оплата и доставка | SST',
    ogDescription:
      'Порядок согласования конфигурации, ориентировочные цены, условия оплаты, доставка транспортными компаниями по РФ и СНГ.',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
  '/warranty': {
    title: 'Гарантия и обращения по качеству | SST',
    description:
      'Условия гарантийных обязательств на изделия SST и турбины GunRace GR30/GR39, сроки, требования к установке и порядок обращений.',
    canonical: `${SITE_URL}/warranty`,
    ogTitle: 'Гарантия и обращения по качеству | SST',
    ogDescription:
      'Условия гарантийных обязательств на изделия SST и турбины GunRace GR30/GR39, сроки, требования к установке и порядок обращений.',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
  '/service': {
    title: 'Обслуживание и диагностика Suzuki Swift Sport ZC33S | SST',
    description:
      'Регламентное ТО, диагностика и подготовка Suzuki Swift Sport ZC33S к увеличению мощности.',
    canonical: `${SITE_URL}/service`,
    ogTitle: 'Обслуживание и диагностика Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Регламентное ТО, диагностика и подготовка Suzuki Swift Sport ZC33S к увеличению мощности.',
    ogImage: `${SITE_URL}/images/service-1280.jpg`,
  },
  '/privacy': {
    title: 'Политика обработки персональных данных | SST',
    description:
      'Политика обработки персональных данных и конфиденциальности информационного каталога Swift Sport Tuning (SST).',
    canonical: `${SITE_URL}/privacy`,
    ogTitle: 'Политика обработки персональных данных | SST',
    ogDescription:
      'Политика обработки персональных данных и конфиденциальности информационного каталога Swift Sport Tuning (SST).',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
  '/legal': {
    title: 'Правовая информация и статус каталога | SST',
    description:
      'Правовая информация, статус непубличной оферты, правила использования материалов и товарные знаки проекта Swift Sport Tuning.',
    canonical: `${SITE_URL}/legal`,
    ogTitle: 'Правовая информация и статус каталога | SST',
    ogDescription:
      'Правовая информация, статус непубличной оферты, правила использования материалов и товарные знаки проекта Swift Sport Tuning.',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
  '/catalog': {
    title: 'Каталог проверенных деталей и тюнинга Suzuki Swift Sport ZC33S | SST',
    description:
      'Артикулы, аналоги, тюнинг-комплектующие, интеркулеры, выхлоп, тормоза и полезные доработки ZC33S.',
    canonical: `${SITE_URL}/catalog`,
    ogTitle: 'Каталог проверенных деталей и тюнинга Suzuki Swift Sport ZC33S | SST',
    ogDescription:
      'Артикулы, аналоги, тюнинг-комплектующие, интеркулеры, выхлоп, тормоза и полезные доработки ZC33S.',
    ogImage: `${SITE_URL}/images/main_page-1920.jpg`,
  },
};

export function getSeoForPath(pathname) {
  // Нормализуем путь: убираем завершающий слэш, если он не корневой
  let clean = pathname.replace(/\/$/, '') || '/';
  // Если зашли по префиксу /zc33s (base path)
  if (clean.startsWith('/zc33s')) {
    clean = clean.slice('/zc33s'.length) || '/';
  }
  return (
    SEO_DATA[clean] || {
      title: 'Suzuki Swift Sport ZC33S — тюнинг, прошивки и компоненты | SST',
      description:
        'Прошивки, турбины, интеркулеры, сцепление и техническая база по Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 и GR39.',
      canonical: `${SITE_URL}${clean}`,
      ogTitle: 'Suzuki Swift Sport ZC33S — тюнинг, прошивки и компоненты | SST',
      ogDescription:
        'Прошивки, турбины, интеркулеры, сцепление и техническая база по Suzuki Swift Sport ZC33S. Stage 1, Stage 2, GR30 и GR39.',
      ogImage: DEFAULT_OG_IMAGE,
    }
  );
}

export function updateDocumentSeo(meta) {
  if (typeof document === 'undefined') return;

  if (meta.title) {
    document.title = meta.title;
  }

  const setMetaTag = (attrName, attrValue, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const setLinkTag = (rel, href) => {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  setMetaTag('name', 'description', meta.description);
  setLinkTag('canonical', meta.canonical);

  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'Swift Sport Tuning');
  setMetaTag('property', 'og:title', meta.ogTitle || meta.title);
  setMetaTag('property', 'og:description', meta.ogDescription || meta.description);
  setMetaTag('property', 'og:image', meta.ogImage || DEFAULT_OG_IMAGE);
  setMetaTag('property', 'og:url', meta.canonical);

  // Twitter cards fallback
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.ogTitle || meta.title);
  setMetaTag('name', 'twitter:description', meta.ogDescription || meta.description);
  setMetaTag('name', 'twitter:image', meta.ogImage || DEFAULT_OG_IMAGE);
}
