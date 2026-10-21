import { Component } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/I18nContext';

/**
 * Ловит ошибки рендера внутри страницы, чтобы вместо пустого экрана
 * пользователь увидел понятное сообщение и мог перезагрузить раздел.
 * Шапка и подвал остаются на месте — граница стоит вокруг <Outlet />.
 */
class Boundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[page] render error:', error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    // Переход на другой раздел или смена языка сбрасывают состояние ошибки.
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError } = this.state;
    const { t, children } = this.props;

    if (!hasError) return children;

    return (
      <section className="page page--error" role="alert">
        <h1 className="page__title">{t('common.loadErrorTitle')}</h1>
        <p className="page__text">{t('common.loadErrorText')}</p>
        <div className="page__error-actions">
          <button className="page__error-button" type="button" onClick={() => window.location.reload()}>
            {t('common.loadErrorReload')}
          </button>
          <Link className="page__error-link" to="/">
            {t('common.loadErrorHome')}
          </Link>
        </div>
      </section>
    );
  }
}

function ErrorBoundary({ children, resetKey }) {
  const { t } = useLanguage();
  return (
    <Boundary t={t} resetKey={resetKey}>
      {children}
    </Boundary>
  );
}

export default ErrorBoundary;
