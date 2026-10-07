import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import './catalog.css';

const pdfUrl = `${import.meta.env.BASE_URL}zc33s_catalog_s.pdf`;

const partsData = [
  {
    id: 'brakes-pads',
    title: 'Колодки',
    rows: [
      {
        label: 'Перед',
        badges: ['55810-52R00', '55810-52R50', '55810-68R10'],
      },
      {
        label: 'Зад',
        badges: ['55800-52R00', '55800-61M10', '55800-68R00'],
      },
    ],
    desc: 'Спереди: Akebono AN-754WK, Kashiyama D0051M, Nisshinbo NP5030, Brembo P 16 013, Brembo Sport HP2 07.D435.67. Сзади: Advics SN248P, Kashiyama D9066M, Akebono AN773WK, Nisshinbo NP9016, Brembo P 79 029.',
    link: {
      url: 'https://www.drive2.ru/l/683313492387702709/',
      text: 'Подробно про аналоги колодок',
    },
  },
  {
    id: 'wheels-tires',
    title: 'Колёса и шины',
    rows: [
      {
        label: 'Диск',
        badges: ['R17×6,5J ET50, 5×114,3, ЦО 60,1'],
      },
      {
        label: 'Гайки',
        badges: ['M12×1,25'],
      },
      {
        label: 'Шины',
        badges: ['195/45 R17'],
      },
      {
        label: 'Запаска',
        badges: ['125/70 R17'],
      },
    ],
    desc: 'Сток — Continental ContiSportContact 5. На родной диск отлично встают 205/45 и 205/40, можно 215/45 и 215/40. На 205/50 летом жалуются: машину «водит» после 150 км/ч, зато зимой это хороший размер. Чем шире диск, тем меньше вылет: 7J ET42 с 215/45 стоят вровень с кузовом, на 7,5J ставят 225/45. 18-й диск влезает, но профиль лучше 35, максимум 40.',
  },
  {
    id: 'engine-mounts',
    title: 'Подушки двигателя',
    rows: [
      {
        label: 'Правая МТ / АТ',
        badges: ['1161067R01', '1161067R00'],
      },
      {
        label: 'Левая МТ / АТ',
        badges: ['1162067R01', '1162067R11'],
      },
      {
        label: 'Задняя МТ / АТ',
        badges: ['1191067R00', '1191067R10'],
      },
    ],
    desc: 'Правая подходит и на механику, и на автомат. Левая от МТ встаёт на АТ, если перекрутить лапу. Вместо дорогой правой ставят подушку от Swift 1,2 с доработкой: 11610M55RB0 (Индия), 11610-52R50 (Япония), 11610-52R00 (ОАЭ). Тюнинг: Cusco 60J911SET и 60J-911-PS, TM-Square TMEM-AF3521.',
    link: {
      url: 'https://www.comfortcustoms.ru/catalog.php',
      text: 'Кастомные подушки ComfortCustoms',
    },
  },
  {
    id: 'brake-rotors',
    title: 'Тормозные диски',
    rows: [
      {
        label: 'Перед, 285×24',
        badges: ['55311-68R00'],
      },
      {
        label: 'Зад, 252×9',
        badges: ['55611-68R00'],
      },
    ],
    desc: 'Спереди: Brembo 09.E533.11, ABS 18813, Mintex MDC3041C, Ferodo DDF2855C, TRW DF6576. Сзади: Brembo 08.E534.11, ABS 18810, Mintex MDC2882C, Ferodo DDF2856C.',
  },
  {
    id: 'bulbs',
    title: 'Лампы',
    rows: [
      { label: 'ПТФ', badges: ['H11'] },
      { label: 'Поворот перед', badges: ['PY21W'] },
      { label: 'Поворот зад', badges: ['WY21W'] },
      { label: 'Задний ход', badges: ['W16W'] },
      { label: 'Номер', badges: ['W5W'] },
      { label: 'Задний туман', badges: ['P21W'] },
    ],
    desc: 'Типы цоколей и маркировка ламп для Suzuki Swift Sport ZC33S.',
  },
  {
    id: 'clutch',
    title: 'Сцепление МКПП',
    rows: [
      { label: 'Выжимной', badges: ['23820-79J00'] },
      { label: 'Корзина', badges: ['22100-68R00'] },
      { label: 'Диск', badges: ['22400-68R00'] },
      { label: 'Маховик', badges: ['12620-68M00'] },
      { label: 'Комплект', badges: ['SACHS 3000950859', 'Exedy SZS2100'] },
    ],
    desc: 'Корзина и диск взаимозаменяемы с Vitara (22100-68M00, 22400-68M00). Выжимной: Exedy CSC406, Luk 510017010, FTE ZA3102831.',
    link: {
      url: 'https://www.drive2.ru/l/701013155693729597/',
      text: 'Усиленное сток-сцепление',
    },
  },
  {
    id: 'wipers',
    title: 'Щётки',
    rows: [
      { label: 'Водитель, 500 мм', badges: ['38340-52R00'] },
      { label: 'Пассажир, 475 мм', badges: ['38340-52R60'] },
      { label: 'Заднее стекло, 250 мм', badges: ['38340-52R40'] },
      { label: 'Зимние', badges: ['3835052R00', '3835072M10', '3835074P00'] },
    ],
    desc: 'Аналоги: Denso DUR-050R и DUR-048R, Masuma MU-020 и MU-019.',
  },
  {
    id: 'battery',
    title: 'Аккумулятор',
    rows: [
      { label: 'Штатный', badges: ['46B24L · 45 А·ч · 295 А'] },
    ],
    desc: 'Из Японии машины часто приходят с 65B24L. В тот же корпус встаёт Rocket 75B24L.',
  },
  {
    id: 'turbo-gaskets',
    title: 'Прокладки турбины',
    rows: [
      { label: 'Турбина', badges: ['14181-86P00'] },
      { label: 'Выход турбины', badges: ['14182-86P00'] },
      { label: 'Впускной патрубок ×2', badges: ['13955-75F50'] },
      { label: 'Шайба 10×15×1,5 ×4', badges: ['09161-10009'] },
      { label: 'Слив масла', badges: ['13945-86P00'] },
      { label: 'Болт M8×25 ×2', badges: ['14118-70G50'] },
      { label: 'Гайка M8 ×2', badges: ['09159-08130'] },
      { label: 'Шпилька ×2', badges: ['09108-08297'] },
      { label: 'Шайба 12×17×1 ×4', badges: ['09168-12017'] },
    ],
    desc: 'Аналоги: Reinz 71-17708-00 вместо 14181-86P00, Fa1 760-914 вместо 14182-86P00, Fa1 433-520 вместо 13945-86P00.',
  },
  {
    id: 'drivetrain-misc',
    title: 'Привода и мелочи',
    rows: [
      { label: 'Привод прав. АТ / МТ', badges: ['44101-68R10', '44101-68R00'] },
      { label: 'Привод лев. АТ / МТ', badges: ['44118-68R30', '44118-68R20'] },
      { label: 'Втулки стабилизатора', badges: ['42431-68R10'] },
      { label: 'Топливный фильтр', badges: ['AD9854C'] },
      { label: 'Сетка топл. фильтра', badges: ['Masuma MPU034'] },
    ],
    desc: 'Подшипники под установку LSD: 27524-79JA0 (заменитель NSK HR32009XJ), 27521-79JA0 (NTN 32010X).',
  },
];

const storeLinks = [
  { name: 'Фарпост', url: 'https://www.farpost.ru/' },
  { name: 'Дром', url: 'https://baza.drom.ru/' },
  { name: 'Exist', url: 'https://exist.ru/' },
  { name: 'Emex', url: 'https://emex.ru/' },
  { name: 'Autodoc', url: 'https://www.autodoc.ru/' },
  { name: 'Avtoto', url: 'https://www.avtoto.ru/' },
  { name: 'ZZap', url: 'https://www.zzap.ru/' },
  { name: 'Tuner', url: 'https://tuner.ru/' },
];

function CodeBadge({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      });
    }
  };

  return (
    <button
      type="button"
      className="catalog-badge"
      onClick={handleCopy}
      title="Нажмите, чтобы скопировать артикул"
      aria-label={`Скопировать артикул ${code}`}
    >
      <span>{code}</span>
      {copied && <span className="catalog-badge__copied">Скопировано!</span>}
    </button>
  );
}

function CatalogApp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Background />
      <Header />
      <main className="catalog-root">
        <div className="catalog-container">
          {/* Hero-блок */}
          <section className="catalog-hero">
            <div className="catalog-hero__tag">
              <span className="catalog-hero__tag-dot" />
              <span>ZC33S · Номера и аналоги</span>
            </div>
            <h1 className="catalog-hero__title">Каталог деталей ZC33S</h1>
            <p className="catalog-hero__subtitle">
              Оригинальные OEM-номера запчастей и проверенные клубом аналоги для Suzuki Swift Sport ZC33S.
              Нажмите на номер детали, чтобы скопировать его в буфер обмена. Перед заказом обязательно сверяйте деталь по номеру кузова.
            </p>
          </section>

          {/* PDF-баннер */}
          <section className="catalog-pdf-card">
            <div className="catalog-pdf-card__info">
              <span className="catalog-pdf-card__label">Каталог запчастей · PDF</span>
              <h2 className="catalog-pdf-card__title">Каталог деталей ZC33S на русском</h2>
              <p className="catalog-pdf-card__desc">
                Полный каталог оригинальных номеров деталей по всем узлам в одном файле.
                Удобно искать схемы, узлы и крепежи.
              </p>
            </div>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="catalog-pdf-card__btn"
            >
              <span>Открыть PDF-каталог</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </section>

          {/* Трёхколоночная сетка карточек деталей */}
          <section className="catalog-grid" aria-label="Карточки запчастей">
            {partsData.map((part, index) => (
              <article key={part.id} className="catalog-card">
                <div className="catalog-card__header">
                  <h3 className="catalog-card__title">{part.title}</h3>
                  <span className="catalog-card__num">#{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="catalog-card__rows">
                  {part.rows.map((row, rIdx) => (
                    <div key={rIdx} className="catalog-card__row">
                      <span className="catalog-card__row-label">{row.label}</span>
                      <div className="catalog-card__row-badges">
                        {row.badges.map((badge, bIdx) => (
                          <CodeBadge key={bIdx} code={badge} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {part.desc && <p className="catalog-card__desc">{part.desc}</p>}

                {part.link && (
                  <a
                    href={part.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-card__link"
                  >
                    <span>{part.link.text}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                )}
              </article>
            ))}
          </section>

          {/* Секция «Где искать» */}
          <section className="catalog-stores">
            <div className="catalog-stores__header">
              <h2 className="catalog-stores__title">Где искать и заказывать</h2>
              <p className="catalog-stores__subtitle">
                Популярные площадки, интернет-магазины автозапчастей и аукционы:
              </p>
            </div>
            <div className="catalog-stores__grid">
              {storeLinks.map((store) => (
                <a
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="catalog-store-card"
                >
                  <span>{store.name}</span>
                  <span className="catalog-store-card__arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CatalogApp;
