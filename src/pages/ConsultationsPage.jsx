import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionToc from '../components/SectionToc';
import InfoSections from '../components/InfoSections';
import { useLanguage } from '../i18n/I18nContext';

/**
 * Справочная страница о консультациях и компонентах (/consultations).
 * Содержание — в src/i18n/content/consultations.js.
 */
function ConsultationsPage() {
  const location = useLocation();
  const { t } = useLanguage();
  const content = t('consultations');
  const sections = content?.sections || [];

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <section className="page consultations-page">
      <PageHeader title={content?.title} lead={content?.lead} ctaNote={content?.ctaNote} />
      <SectionToc
        sections={sections}
        title={content?.tocTitle}
        ariaLabel={content?.tocTitle}
        className="consultations-page"
      />
      <InfoSections
        sections={sections}
        itemClass="consultation-section"
        wrapperClass="consultations-page__sections"
      />
    </section>
  );
}

export default ConsultationsPage;
