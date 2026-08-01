import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';

const EASTER_EGG_CLICKS = 5;
const RESET_TIMEOUT = 2000;
const VISIBLE_DURATION = 1800;
const EXIT_DURATION = 500;

const navItems = [
  { to: '/tuning', label: 'Прошивки' },
  { to: '/service', label: 'Обслуживание' },
  { to: '/faq', label: 'FAQ по авто' },
  { to: '/custom', label: 'Кастомное производство' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eggPhase, setEggPhase] = useState(null); // null | 'entering' | 'visible' | 'exiting'
  const eggCounterRef = useRef(0);
  const resetTimerRef = useRef(null);

  // Close menu on route change (when a link is clicked)
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        <NavLink to="/" className="header__logo" onClick={(e) => { handleNavClick(); handleLogoClick(); }}>
          <span className="header__logo-full">Swift Sport Tuning</span>
          <span className="header__logo-short">SST</span>
        </NavLink>

        <div className="header__right">
          <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
            <button
              className="header__nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {navItems.map(({ to, label }) => (
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
            <div className="header__overlay" onClick={() => setMenuOpen(false)} />
          )}

          <div className="header__actions">
            <a
              href="https://t.me/+1hplL5z7qHo4Nzdi"
              className="header__contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Связаться
            </a>
            <button
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
            <img
               src={`${import.meta.env.BASE_URL}images/kolenka.jpg`}
              alt=""
              className="easter-egg__img"
            />
          </div>,
          document.body
        )}
    </header>
  );
}

export default Header;
