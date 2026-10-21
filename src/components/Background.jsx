import { useEffect, useRef } from 'react';

const BACKGROUND_PHOTO = `${import.meta.env.BASE_URL}images/main_page-1920.jpg`;

function readScrollProgress() {
  if (typeof window === 'undefined') return 0;
  return Math.min(window.scrollY / (window.innerHeight || 1), 1);
}

/**
 * Фоновая фотография под контентом с плавным проявлением при скролле.
 *
 * Раньше здесь был setState на каждое событие scroll — то есть React
 * перерисовывал всё поддерево на каждый пиксель прокрутки ради одного числа.
 * Теперь обработчик пишет opacity прямо в DOM (не чаще одного раза на кадр),
 * и перерисовки React не происходит вообще.
 */
function Background() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return undefined;

    let frame = 0;

    const apply = () => {
      frame = 0;
      el.style.opacity = String(readScrollProgress());
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    // При изменении высоты окна прогресс пересчитывается: он завязан на vh.
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="site-bg" aria-hidden="true">
      <div
        className="site-bg__layer site-bg__layer--1"
        style={{ backgroundImage: `url(${BACKGROUND_PHOTO})` }}
      />
      <div
        ref={overlayRef}
        className="site-bg__layer site-bg__layer--2"
        style={{ backgroundImage: `url(${BACKGROUND_PHOTO})` }}
      />
    </div>
  );
}

export default Background;
