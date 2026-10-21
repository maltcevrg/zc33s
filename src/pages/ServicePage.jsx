import TelegramCta from '../components/TelegramCta';
import { useLanguage } from '../i18n/I18nContext';

function ServicePage() {
  const { t } = useLanguage();
  const content = t('service');

  return (
    <section className="page">
      <h1 className="page__title">{content?.title}</h1>

      {/* Раздел наполняется; единственная точка контакта — официальный Telegram. */}
      <div className="page__intro">
        <p className="page__text">{content?.lead}</p>
        <TelegramCta note={content?.note} />
      </div>
    </section>
  );
}

export default ServicePage;
