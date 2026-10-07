// Главные разделы сайта: единый источник данных для карточек на главной
// и для навигации в шапке. Названия пунктов меню совпадают с названиями разделов.
//
// Раздел показывается только после наполнения своей страницы: пока контента нет,
// для него стоит false в SECTION_READY. Как только страница наполнится, поставьте
// true — карточка на главной и пункт меню включатся сами, верстку править не нужно.
export const SECTION_READY = {
  service: false,
};

export const isSectionReady = (id) => SECTION_READY[id] !== false;

// Порядок карточек на главной = порядок разделов ниже.
export const HOME_SECTIONS = [
  {
    id: 'tuning',
    title: 'Прошивки',
    desc: 'Stage 1, Stage 2 и индивидуальные калибровки ECU.',
    img: 'dyno-1280.jpg',
    link: '/tuning',
  },
  {
    id: 'components',
    title: 'Компоненты',
    desc: 'Турбины, интеркулеры, сцепление и другие компоненты для проверенных конфигураций.',
    img: 'turbo-960.jpg',
    link: '/custom',
  },
  {
    id: 'knowledge',
    title: 'База знаний',
    desc: 'Эксплуатация, настройка, прошивка, обслуживание и выбор автомобиля.',
    img: 'baza-1280.jpg',
    link: '/faq',
  },
  {
    id: 'service',
    title: 'Обслуживание',
    desc: 'Диагностика, регламентное обслуживание и подготовка автомобиля к тюнингу.',
    img: 'service-1280.jpg',
    link: '/service',
  },
];

// Разделы, которые уже можно показывать посетителю.
export const visibleHomeSections = HOME_SECTIONS.filter((section) => isSectionReady(section.id));

// Меню шапки: те же разделы в том же порядке (label = название раздела).
// Каталог деталей добавлен явно — карточки на главной у него нет,
// но пункт меню нужен.
export const NAV_ITEMS = [
  ...HOME_SECTIONS.map(({ id, title, link }) => ({ to: link, label: title, section: id })),
  { to: '/catalog', label: 'Каталог деталей' },
];

export const visibleNavItems = NAV_ITEMS.filter(
  (item) => !item.section || isSectionReady(item.section)
);
