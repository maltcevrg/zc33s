import PageHeader from '../components/PageHeader';
import { useLanguage } from '../i18n/I18nContext';

function ServicePage() {
  const { t } = useLanguage();
  const content = t('service');

  return (
    <section className="page">
      {/* Раздел наполняется; единственная точка контакта — официальный Telegram. */}
      <PageHeader title={content?.title} lead={content?.lead} ctaNote={content?.note} />
    </section>
  );
}

export default ServicePage;
