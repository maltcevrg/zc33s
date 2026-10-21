import PageHeader from '../components/PageHeader';
import SectionToc from '../components/SectionToc';
import InfoSections from '../components/InfoSections';
import { useLanguage } from '../i18n/I18nContext';

function AboutPage() {
  const { t } = useLanguage();
  const content = t('about');
  const sections = content?.sections || [];

  return (
    <section className="page about-page">
      <PageHeader title={content?.title} lead={content?.lead} ctaNote={content?.ctaNote} />
      <SectionToc
        sections={sections}
        title={content?.tocTitle}
        ariaLabel={content?.tocTitle}
        className="about-page"
      />
      <InfoSections sections={sections} itemClass="about-section" wrapperClass="about-page__sections" />
    </section>
  );
}

export default AboutPage;
