import { useState, useEffect } from 'react';

const PHOTO_1 = './images/main_page.jpg';
const PHOTO_2 = './images/main_page.jpg';

function getScrollProgress() {
  if (typeof window === 'undefined') return 0;
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  return progress;
}

function Background() {
  const [opacity, setOpacity] = useState(getScrollProgress);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const progress = Math.min(scrollY / viewH, 1);
      setOpacity(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site-bg" aria-hidden="true">
      <div
        className="site-bg__layer site-bg__layer--1"
        style={{ backgroundImage: `url(${PHOTO_1})` }}
      />
      <div
        className="site-bg__layer site-bg__layer--2"
        style={{ backgroundImage: `url(${PHOTO_2})`, opacity }}
      />
    </div>
  );
}

export default Background;
