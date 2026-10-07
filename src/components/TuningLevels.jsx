import { useEffect, useRef, useState } from 'react';

const levels = [
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
    config: ['Гибридная турбина', 'Supporting mods'],
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
];

// Полоски мощности масштабируются относительно самого мощного уровня линейки.
const maxPowerScale = Math.max(...levels.map((level) => level.powerValue));

const powerScale = (level) => Math.min(level.powerValue / maxPowerScale, 1).toFixed(3);
const stageNumber = (index) => String(index + 1).padStart(2, '0');

// Полоски мощности «прорастают», когда блок появляется в кадре.
function useInView(ref) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

function PowerBar({ level, index }) {
  return (
    <span
      className="level-bar"
      style={{ '--level-index': index, '--level-scale': powerScale(level) }}
      aria-hidden="true"
    >
      <span className="level-bar__fill" />
    </span>
  );
}

function TuningLevels() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="levels"
      className={`home__levels${inView ? ' home__levels--visible' : ''}`}
      aria-labelledby="tuning-levels-title"
    >
      <header className="home__levels-head">
        <p className="home__levels-eyebrow">Гид по уровням</p>
        <h2 className="home__levels-title" id="tuning-levels-title">
          Уровни тюнинга
        </h2>
        <p className="home__levels-lead">
          Четыре уровня конфигурации: что меняется в железе, какое топливо требуется и какую
          мощность ориентировочно даёт каждый шаг.
        </p>
      </header>

      {/* Desktop: горизонтальная сравнительная матрица */}
      <div className="levels-matrix">
        <table className="levels-matrix__table">
          <caption className="levels-matrix__caption">
            Сравнение уровней тюнинга: конфигурация, топливо и ориентировочная мощность
          </caption>
          <thead>
            <tr>
              <th scope="col" className="levels-matrix__corner">
                Уровень
              </th>
              {levels.map((level, index) => (
                <th key={level.id} scope="col" className="levels-matrix__stage">
                  <span className="levels-matrix__index">{stageNumber(index)}</span>
                  <span className="levels-matrix__name">{level.name}</span>
                  {level.tag ? <span className="levels-matrix__tag">{level.tag}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="levels-matrix__row-title">
                Конфигурация
              </th>
              {levels.map((level) => (
                <td key={level.id} className="levels-matrix__cell">
                  <ul className="levels-matrix__list">
                    {level.config.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="levels-matrix__row-title">
                Топливо
              </th>
              {levels.map((level) => (
                <td key={level.id} className="levels-matrix__cell">
                  <span className="levels-matrix__fuel">{level.fuel}</span>
                  {level.fuelNote ? (
                    <span className="levels-matrix__fuel-note">{level.fuelNote}</span>
                  ) : null}
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="levels-matrix__row-title levels-matrix__row-title--power">
                Мощность, ориентировочно
              </th>
              {levels.map((level, index) => (
                <td key={level.id} className="levels-matrix__cell levels-matrix__cell--power">
                  <span className="levels-matrix__power">
                    {level.powerPrefix ? (
                      <span className="levels-matrix__power-prefix">{level.powerPrefix}</span>
                    ) : null}
                    <span className="levels-matrix__power-value">{level.power}</span>
                    <span className="levels-matrix__power-unit">л.с.</span>
                  </span>
                  <PowerBar level={level} index={index} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile: карточки уровней */}
      <div className="levels-cards">
        {levels.map((level, index) => (
          <article
            key={level.id}
            className="level-card"
            style={{ '--level-index': index }}
          >
            <header className="level-card__head">
              <span className="level-card__index">{stageNumber(index)}</span>
              <h3 className="level-card__name">{level.name}</h3>
              {level.tag ? <span className="level-card__tag">{level.tag}</span> : null}
            </header>

            <p className="level-card__power-caption">Мощность, ориентировочно</p>
            <p className="level-card__power">
              {level.powerPrefix ? (
                <span className="level-card__power-prefix">{level.powerPrefix}</span>
              ) : null}
              <span className="level-card__power-value">{level.power}</span>
              <span className="level-card__power-unit">л.с.</span>
            </p>
            <PowerBar level={level} index={index} />

            <dl className="level-card__specs">
              <div className="level-card__spec">
                <dt>Конфигурация</dt>
                <dd>
                  {level.config.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
              <div className="level-card__spec">
                <dt>Топливо</dt>
                <dd>
                  <span>{level.fuel}</span>
                  {level.fuelNote ? <span className="level-card__fuel-note">{level.fuelNote}</span> : null}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="home__levels-note">
        Фактические показатели зависят от состояния автомобиля, состава оборудования, топлива,
        условий окружающей среды и индивидуальной настройки ECU.
      </p>
    </section>
  );
}

export default TuningLevels;
