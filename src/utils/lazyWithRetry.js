import { lazy } from 'react';

// Динамический импорт может не дойти до браузера: перезапустили dev-сервер,
// выкатили новую сборку со старыми именами чанков, моргнула сеть. Снаружи это
// выглядит как «раздел не грузится» — Suspense так и висит на заглушке.
//
// Поэтому: одна повторная попытка, затем одна перезагрузка страницы (при новом
// деплое она гарантированно подтянет актуальные чанки). Флаг в sessionStorage
// не даёт уйти в бесконечный цикл, если сломано по-настоящему.
const RELOAD_FLAG = 'sst_chunk_reload';

function clearReloadFlag() {
  try {
    sessionStorage.removeItem(RELOAD_FLAG);
  } catch {}
}

function reloadOnce() {
  try {
    if (sessionStorage.getItem(RELOAD_FLAG)) return false;
    sessionStorage.setItem(RELOAD_FLAG, '1');
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

/**
 * React.lazy с повтором и восстановлением после устаревшего чанка.
 *
 * @param {() => Promise<{ default: import('react').ComponentType }>} factory
 * @returns {import('react').LazyExoticComponent}
 */
export function lazyWithRetry(factory) {
  return lazy(() =>
    factory()
      .then((module) => {
        clearReloadFlag();
        return module;
      })
      .catch(() => factory())
      .catch((error) => {
        if (!reloadOnce()) throw error;
        // Пока страница перезагружается, размонтирования не будет — отдаём
        // «пустой» компонент, чтобы React не ругался на висящий Suspense.
        return { default: () => null };
      })
  );
}

export default lazyWithRetry;
