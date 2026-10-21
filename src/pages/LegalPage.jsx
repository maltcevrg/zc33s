import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TELEGRAM_URL } from '../data/siteConfig';
import { useLanguage } from '../i18n/I18nContext';
import { sanitizeHtml } from '../utils/sanitizeHtml';

function LegalPage() {
  const { t } = useLanguage();
  const content = t('legal');
  const sections = content?.sections || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="page legal-page">
      <div className="faq-article__bar">
        <Link to="/" className="faq-article__back">
          {content?.back}
        </Link>
      </div>

      <header className="page__intro" style={{ marginBottom: '32px' }}>
        <h1 className="page__title">{content?.title}</h1>
        <p className="page__text">{content?.lead}</p>
      </header>

      <div className="faq-article__content">
        {sections.map((section, index) => (
          <div key={section.title}>
            <p>
              <strong>{section.title}</strong>
            </p>
            {section.paragraphs?.map((text, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
            ))}
            {index === sections.length - 1 && (
              <p>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
                >
                  {TELEGRAM_URL}
                </a>
                .
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="knowledge-article__bottom-nav" style={{ marginTop: '48px' }}>
        <Link to="/" className="knowledge-article__back-btn">
          {content?.bottomBack}
        </Link>
      </div>
    </section>
  );
}

export default LegalPage;
