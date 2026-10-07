import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { CTA_LABEL, TELEGRAM_URL } from '../data/siteConfig';
import { visibleNavItems } from '../data/siteSections';

const EASTER_EGG_CLICKS = 5;
const RESET_TIMEOUT = 2000;
const VISIBLE_DURATION = 1800;
const EXIT_DURATION = 500;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Меню — из единого источника разделов (src/data/siteSections.js): названия
// пунктов совпадают с названиями разделов, а ненаполненные разделы не показываются.

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggPhase, setEggPhase] = useState(null); // null | 'entering' | 'visible' | 'exiting'
  const eggCounterRef = useRef(0);
  const resetTimerRef = useRef(null);

  const burgerRef = useRef(null);
  const navRef = useRef(null);
  const openerRef = useRef(null);

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
        // Focus the close button or first link
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
          aria-label="Swift Sport Tuning — Главная"
        >
          <span className="header__logo-full">Swift Sport Tuning</span>
          <span className="header__logo-short">SST</span>
        </NavLink>

        <div className="header__right">
          <nav
            ref={navRef}
            className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
            aria-label="Основное меню"
          >
            <button
              className="header__nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
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
                {label}
              </NavLink>
            ))}
          </nav>

          {menuOpen && (
            <div
              className="header__overlay"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          <div className="header__actions">
            {/* Основной CTA проекта: уход в официальный Telegram-контакт. */}
            <a
              href={TELEGRAM_URL}
              className="header__contact"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${CTA_LABEL} в официальном Telegram`}
            >
              {CTA_LABEL}
            </a>
            <button
              ref={burgerRef}
              type="button"
              className={`header__burger${menuOpen ? ' header__burger--active' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
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
