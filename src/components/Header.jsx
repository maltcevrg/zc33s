import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { TELEGRAM_URL } from '../data/siteConfig';
import { visibleNavItems } from '../data/siteSections';
import { useLanguage } from '../i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

const EASTER_EGG_CLICKS = 5;
const RESET_TIMEOUT = 2000;
const VISIBLE_DURATION = 1800;
const EXIT_DURATION = 500;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Маппинг путей меню → ключам перевода
const NAV_KEY_BY_PATH = {
  '/tuning': 'nav.tuning',
  '/custom': 'nav.components',
  '/knowledge': 'nav.knowledge',
  '/about': 'nav.about',
  '/service': 'nav.service',
  '/catalog': 'nav.catalog',
};

function getNavLabel(to, t, fallback) {
  const key = NAV_KEY_BY_PATH[to];
  if (!key) return fallback;
  const translated = t(key);
  // t возвращает ключ, если нет перевода — проверяем
  if (translated === key) return fallback;
  return translated;
}

function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggPhase, setEggPhase] = useState(null); // null | 'entering' | 'visible' | 'exiting'
  const eggCounterRef = useRef(0);
  const resetTimerRef = useRef(null);

  const burgerRef = useRef(null);
  const navRef = useRef(null);
  const openerRef = useRef(null);

  const ctaLabel = t('cta.discuss');
  const ctaAria = t('cta.discussAria');

  // Close menu on route change (when a link is clicked)
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Focus trap for Navigation Drawer
  useEffect(() => {
    if (!menuOpen) return undefined;
    lockScroll();

    openerRef.current = document.activeElement;

    // Focus moves inside nav drawer
    const nav = navRef.current;
    if (nav) {
      const focusable = [...nav.querySelectorAll(FOCUSABLE)];
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
      } else if (e.key === 'Tab' && nav) {
        const focusable = [...nav.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !nav.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !nav.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockScroll();
      if (openerRef.current instanceof HTMLElement && document.contains(openerRef.current)) {
        openerRef.current.focus({ preventScroll: true });
      } else if (burgerRef.current) {
        burgerRef.current.focus({ preventScroll: true });
      }
    };
  }, [menuOpen]);

  const resetCounter = useCallback(() => {
    eggCounterRef.current = 0;
  }, []);

  const handleLogoClick = () => {
    eggCounterRef.current += 1;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    if (eggCounterRef.current >= EASTER_EGG_CLICKS) {
      eggCounterRef.current = 0;
      setEggPhase('entering');
    } else {
      resetTimerRef.current = setTimeout(resetCounter, RESET_TIMEOUT);
    }
  };

  // Управление фазами анимации пасхалки
  useEffect(() => {
    if (eggPhase === 'entering') {
      const t1 = setTimeout(() => setEggPhase('visible'), 500);
      return () => clearTimeout(t1);
    }
    if (eggPhase === 'visible') {
      const t2 = setTimeout(() => setEggPhase('exiting'), VISIBLE_DURATION);
      return () => clearTimeout(t2);
    }
    if (eggPhase === 'exiting') {
      const t3 = setTimeout(() => setEggPhase(null), EXIT_DURATION);
      return () => clearTimeout(t3);
    }
  }, [eggPhase]);

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink
          to="/"
          className="header__logo"
          onClick={(e) => {
            handleNavClick();
            handleLogoClick();
          }}
          aria-label={t('header.logoAria')}
        >
          <span className="header__logo-full">Swift Sport Tuning</span>
          <span className="header__logo-short">SST</span>
        </NavLink>

        <div className="header__right">
          <nav
            ref={navRef}
            className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
            aria-label={t('header.mainNav')}
          >
            <button
              className="header__nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label={t('header.closeMenu')}
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {visibleNavItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'header__link header__link--active' : 'header__link'
                }
                onClick={handleNavClick}
              >
                {getNavLabel(to, t, label)}
              </NavLink>
            ))}

            {/* Переключатель языков внутри мобильного дровера */}
            <div className="header__lang header__lang--mobile">
              <LanguageSwitcher variant="mobile" />
            </div>
          </nav>

          {menuOpen && (
            <div
              className="header__overlay"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          <div className="header__actions">
            {/* Переключатель языков — десктоп */}
            <div className="header__lang header__lang--desktop">
              <LanguageSwitcher variant="desktop" />
            </div>

            {/* Основной CTA проекта: уход в официальный Telegram-контакт. */}
            <a
              href={TELEGRAM_URL}
              className="header__contact"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ctaAria}
            >
              {ctaLabel}
            </a>
            <button
              ref={burgerRef}
              type="button"
              className={`header__burger${menuOpen ? ' header__burger--active' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Пасхалка — через портал в body */}
      {eggPhase &&
        createPortal(
          <div className={`easter-egg easter-egg--${eggPhase}`}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${import.meta.env.BASE_URL}images/kolenka.webp`}
              />
              <img
                src={`${import.meta.env.BASE_URL}images/kolenka.jpg`}
                alt="Инженерная пасхалка"
                className="easter-egg__img"
                width="300"
                height="300"
                loading="lazy"
              />
            </picture>
          </div>,
          document.body
        )}
    </header>
  );
}

export default Header;
