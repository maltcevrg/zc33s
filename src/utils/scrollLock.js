// Общая блокировка прокрутки страницы для оверлеев (мобильное меню, модалка карточки).
// Счётчик позволяет нескольким оверлеям не мешать друг другу.
//
// Блокируем именно <html>: в стилях у него задан overflow-y: scroll, поэтому
// overflow у <body> не пробрасывается во viewport и ничего не блокирует.
// scrollbar-gutter: stable сохраняет место под полосу прокрутки, и контент не «прыгает».
let locks = 0;
let previous = null;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;

  const { style } = document.documentElement;
  previous = { overflow: style.overflow, scrollbarGutter: style.scrollbarGutter };
  style.overflow = 'hidden';
  style.scrollbarGutter = 'stable';
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;

  const { style } = document.documentElement;
  style.overflow = previous.overflow;
  style.scrollbarGutter = previous.scrollbarGutter;
  previous = null;
}
