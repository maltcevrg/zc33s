import { CTA_LABEL, TELEGRAM_URL } from '../data/siteConfig';

// Компактный залитый самолётик: остаётся контрастным на светлой и тёмной кнопке.
function SendIcon() {
  return (
    <svg
      className="cta__icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 21 23 12 2 3 2 10l15 2-15 2z" />
    </svg>
  );
}

/**
 * Основной CTA проекта — переход в официальный Telegram-контакт.
 * Никаких форм и полей ввода: ссылка открывается в новой вкладке,
 * персональные данные сайт не собирает.
 *
 * tone:  'dark'  — тёмная кнопка на светлом фоне (страницы, модалка карточки);
 *        'light' — светлая кнопка на тёмном фоне (hero главной).
 * inline: true — кнопка и пояснение в одну строку (hero), false — пояснение под кнопкой.
 */
function TelegramCta({ tone = 'dark', label = CTA_LABEL, note = '', inline = false, className = '' }) {
  const classes = ['cta', `cta--${tone}`, inline ? 'cta--inline' : '', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <a
        className="cta__button"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SendIcon />
        <span>{label}</span>
      </a>
      {note && <p className="cta__note">{note}</p>}
    </div>
  );
}

export default TelegramCta;
