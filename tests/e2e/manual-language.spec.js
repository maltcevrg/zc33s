import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// These fixtures exercise language switching even before the bulk dataset exists.
// They are not a substitute for generating/reviewing public/manual/en.
const id = 'AJPHSB0PF03I001';
const source = JSON.parse(readFileSync(`public/manual/documents/${id}.json`, 'utf8'));
const dictionary = JSON.parse(readFileSync('scripts/manual/translation-overrides.json', 'utf8'));
function translate(value) {
  if (typeof value === 'string') {
    if (!/[А-Яа-яЁё]/.test(value)) return value;
    const key = value.replace(/\s+/g, ' ').trim();
    if (!(key in dictionary)) throw new Error(`Fixture translation missing: ${key}`);
    return dictionary[key];
  }
  if (Array.isArray(value)) return value.map(translate);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value)
    .filter(([key]) => key !== 'searchText')
    .map(([key, item]) => [key, key === 'attrs' ? item : translate(item)]));
  return value;
}
const english = { ...translate(source), language: 'en' };
const entry = {id, title: english.title, groupId: '', groupTitle: english.groupTitle, sectionId: source.sectionId, variant: 'Sport', path: `documents/${id}.json`};
const index = { schemaVersion: 3, language: 'en',
  chapters: [{number: '0', title: 'General information'}],
  sections: [{id: source.sectionId, number: '0', chapter: '0', title: 'Overview', variants: ['Sport']}],
  documents: [entry], targets: {[id]: {title: english.title, available: true}},
};
async function mockEnglish(page, delay = 0) {
  await page.route('**/manual/en/index.json', route => route.fulfill({json: index}));
  await page.route(`**/manual/en/documents/${id}.json`, async route => {
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    await route.fulfill({json: english});
  });
  await page.route('**/manual/en/search.json', route => route.fulfill({json: [{...entry, text: 'Turbocharged engine with intake VVT.'}]}));
}
const languageButton = (page, lang) => page.locator('.header__lang--desktop button').filter({hasText: lang});

test('manual switches the document, navigation, outline, history and search to English', async ({page}) => {
  await mockEnglish(page);
  await page.goto(`manual/?doc=${id}`);
  await expect(page.locator('.manual-document-title')).toHaveText('Основные особенности');
  await page.locator('.manual-bookmark').click();
  await languageButton(page, 'EN').click();
  await expect(page.locator('.manual-document-title')).toHaveText('Main features');
  await expect(page.locator('.manual-page')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.manual-content')).toContainText('Boost pressure and oil temperature');
  await expect(page.locator('.manual-outline')).toContainText('Drivetrain and axles');
  await expect(page.locator('.manual-bookmark')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.manual-reading-list').first()).toContainText('Main features');
  expect(await page.locator('.manual-page').innerText()).not.toMatch(/[А-Яа-яЁё]/);
  await expect(page).toHaveURL(new RegExp(`doc=${id}`));
  await page.locator('#manual-search-input').fill('turbocharged');
  await expect(page.locator('.manual-results')).toContainText('Turbocharged engine');
  await languageButton(page, 'RU').click();
  await expect(page.locator('.manual-document-title')).toHaveText('Основные особенности');
  await expect(page.locator('.manual-content')).toContainText('Давление наддува');
});

test('slow English request cannot overwrite a return to Russian', async ({page}) => {
  await mockEnglish(page, 1000);
  await page.goto(`manual/?doc=${id}`);
  await expect(page.locator('.manual-document-title')).toBeVisible();
  const request = page.waitForRequest(`**/manual/en/documents/${id}.json`);
  await languageButton(page, 'EN').click();
  await request;
  await languageButton(page, 'RU').click();
  await expect(page.locator('.manual-document-title')).toHaveText('Основные особенности');
  await page.waitForTimeout(1100);
  await expect(page.locator('.manual-document-title')).toHaveText('Основные особенности');
  await expect(page.locator('.manual-content')).toHaveAttribute('lang', 'ru');
});

test('missing English dataset is explicit, never Russian text labelled English', async ({page}) => {
  await page.route('**/manual/en/index.json', route => route.fulfill({status: 404, body: 'Not found'}));
  await page.addInitScript(() => localStorage.setItem('sst_lang', 'en'));
  await page.goto(`manual/?doc=${id}`);
  await expect(page.getByRole('alert')).toContainText('has not been generated yet');
  await expect(page.locator('.manual-content')).toHaveCount(0);
  await page.getByRole('button', {name: 'Read the Russian source'}).click();
  await expect(page.locator('.manual-document-title')).toHaveText('Основные особенности');
});
