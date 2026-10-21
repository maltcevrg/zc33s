import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/I18nContext';

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

function PowerBar({ level, maxPowerScale, index }) {
  const powerScale = Math.min(level.powerValue / maxPowerScale, 1).toFixed(3);
  return (
    <span
      className="level-bar"
      style={{ '--level-index': index, '--level-scale': powerScale }}
      aria-hidden="true"
    >
      <span className="level-bar__fill" />
    </span>
  );
}

function TuningLevels() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  const levels = t('home.levels.items');
  const table = t('home.levels.table');
  const powerUnit = t('home.levels.powerUnit');

  const maxPowerScale = Math.max(...levels.map((level) => level.powerValue));

  return (
    <section
      ref={sectionRef}
      id="levels"
      className={`home__levels${inView ? ' home__levels--visible' : ''}`}
      aria-labelledby="tuning-levels-title"
    >
      <header className="home__levels-head">
        <p className="home__levels-eyebrow">{t('home.levels.eyebrow')}</p>
        <h2 className="home__levels-title" id="tuning-levels-title">
          {t('home.levels.title')}
        </h2>
        <p className="home__levels-lead">{t('home.levels.lead')}</p>
      </header>

      {/* Desktop: горизонтальная сравнительная матрица */}
      <div className="levels-matrix">
        <table className="levels-matrix__table">
          <caption className="levels-matrix__caption">
            {table.level}: {table.config}, {table.fuel}, {table.power}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="levels-matrix__corner">
                {table.level}
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
                {table.config}
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
                {table.fuel}
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
                {table.power}
              </th>
              {levels.map((level, index) => (
                <td key={level.id} className="levels-matrix__cell levels-matrix__cell--power">
                  <span className="levels-matrix__power">
                    {level.powerPrefix ? (
                      <span className="levels-matrix__power-prefix">{level.powerPrefix}</span>
                    ) : null}
                    <span className="levels-matrix__power-value">{level.power}</span>
                    <span className="levels-matrix__power-unit">{powerUnit}</span>
                  </span>
                  <PowerBar level={level} maxPowerScale={maxPowerScale} index={index} />
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

            <p className="level-card__power-caption">{table.powerCaption}</p>
            <p className="level-card__power">
              {level.powerPrefix ? (
                <span className="level-card__power-prefix">{level.powerPrefix}</span>
              ) : null}
              <span className="level-card__power-value">{level.power}</span>
              <span className="level-card__power-unit">{powerUnit}</span>
            </p>
            <PowerBar level={level} maxPowerScale={maxPowerScale} index={index} />

            <dl className="level-card__specs">
              <div className="level-card__spec">
                <dt>{table.config}</dt>
                <dd>
                  {level.config.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
              <div className="level-card__spec">
                <dt>{table.fuel}</dt>
                <dd>
                  <span>{level.fuel}</span>
                  {level.fuelNote ? <span className="level-card__fuel-note">{level.fuelNote}</span> : null}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="home__levels-note">{t('home.levels.note')}</p>
    </section>
  );
}

export default TuningLevels;
