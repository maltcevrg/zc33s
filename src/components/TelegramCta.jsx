import { CTA_LABEL, TELEGRAM_URL } from '../data/siteConfig';

// Иконка «самолётик» в стиле остальных inline-иконок проекта (stroke + currentColor).
function SendIcon() {
  return (
    <svg
      className="cta__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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
