import { useLanguage } from '../i18n/I18nContext';

/**
 * Заглушка на время загрузки ленивого чанка страницы.
 * aria-busy + aria-live, чтобы скринридер объявил ожидание, а не пустоту.
 */
function RouteFallback() {
  const { t } = useLanguage();

  return (
    <section className="page page--loading" aria-busy="true" aria-live="polite">
      <p className="page__text">{t('common.loading')}</p>
    </section>
  );
}

export default RouteFallback;
