import { useEffect, useState } from 'react';

/**
 * true, когда страница прокручена ниже threshold пикселей.
 *
 * Нужен для кнопки «наверх». Обработчик троттлится через requestAnimationFrame,
 * а состояние меняется только на пересечении порога — иначе каждое событие
 * scroll вызывало бы перерисовку.
 */
export function useScrolledPast(threshold = 400) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setPassed(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return passed;
}

export default useScrolledPast;
