import PageHeader from '../components/PageHeader';
import SectionToc from '../components/SectionToc';
import InfoSections from '../components/InfoSections';
import { useLanguage } from '../i18n/I18nContext';

/**
 * Справочная страница о гарантийных условиях производителей (/warranty).
 * Содержание берётся из i18n/content/warranty.js.
 */
function WarrantyPage() {
  const { t } = useLanguage();
  const content = t('warranty');
  const sections = content?.sections || [];

  return (
    <section className="page warranty-page">
      <PageHeader title={content?.title} lead={content?.lead} ctaNote={content?.note} />
      <SectionToc
        sections={sections}
        title={content?.tocTitle}
        ariaLabel={content?.tocTitle}
        className="warranty-page"
      />
      <InfoSections sections={sections} itemClass="warranty-section" wrapperClass="warranty-page__sections" />
    </section>
  );
}

export default WarrantyPage;
