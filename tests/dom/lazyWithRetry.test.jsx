import { test, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Suspense } from 'react';

import { lazyWithRetry } from '../../src/utils/lazyWithRetry';

beforeEach(() => {
  sessionStorage.clear();
  cleanup();
});

function Page() {
  return <h1>Раздел загрузился</h1>;
}

test('первая неудачная загрузка чанка не ломает страницу — срабатывает повтор', async () => {
  const factory = vi
    .fn()
    .mockRejectedValueOnce(new Error('chunk failed'))
    .mockResolvedValue({ default: Page });
  const Lazy = lazyWithRetry(factory);

  render(
    <Suspense fallback={<p>Загрузка…</p>}>
      <Lazy />
    </Suspense>
  );

  expect(await screen.findByText('Раздел загрузился')).toBeTruthy();
  expect(factory).toHaveBeenCalledTimes(2);
});

test('успешная загрузка снимает флаг перезагрузки', async () => {
  sessionStorage.setItem('sst_chunk_reload', '1');
  const Lazy = lazyWithRetry(() => Promise.resolve({ default: Page }));

  render(
    <Suspense fallback={<p>Загрузка…</p>}>
      <Lazy />
    </Suspense>
  );

  await screen.findByText('Раздел загрузился');
  expect(sessionStorage.getItem('sst_chunk_reload')).toBeNull();
});
