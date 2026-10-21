import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/I18nContext';

const imageUrl = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Сводный лист диностенда: Stage 1, Stage 2, GR30 и GR39 на одном графике.
// Заголовок, лид и подписи уровней уже есть на самом листе, поэтому текстовую
// шапку не дублируем — оставляем скрытый h2 для структуры документа.
function TuningLevels() {
  const { t } = useLanguage();

  return (
    <section id="levels" className="home__levels" aria-labelledby="tuning-levels-title">
      <h2 className="home__levels-title home__levels-title--sr" id="tuning-levels-title">
        {t('home.levels.title')}
      </h2>

      <figure className="home__levels-figure">
        <picture>
          <source type="image/webp" srcSet={imageUrl('stage-levels.webp')} />
          <img
            src={imageUrl('stage-levels.jpg')}
            alt={t('tuning.overviewAlt')}
            width="1600"
            height="843"
            loading="lazy"
          />
        </picture>
      </figure>

      <div className="home__levels-foot">
        <p className="home__levels-note">{t('home.levels.note')}</p>
        <Link className="home__levels-more" to="/tuning">
          {t('home.levels.more')}
        </Link>
      </div>
    </section>
  );
}

export default TuningLevels;
