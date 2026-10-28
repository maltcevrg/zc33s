import { useLanguage } from '../i18n/I18nContext';

export default function PageLoading() {
  const { t } = useLanguage();
  return <p className="page__text" role="status">{t('common.loading')}</p>;
}
