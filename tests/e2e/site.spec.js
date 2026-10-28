import { test, expect } from '@playwright/test';

async function expectAnchor(page, number) {
  await expect(page).toHaveURL(new RegExp(`#section-${number}$`));
  await expect.poll(() => page.locator(`#section-${number}`).evaluate((el) =>
    Math.round(el.getBoundingClientRect().top)
  )).toBe(84);
}

for (const width of [390, 768, 1160]) {
  test(`mobile menu: overlay, keyboard, close and resize (${width}px)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('./');
    const menu = page.locator('.header__nav');
    const burger = page.locator('.header__burger');
    await expect(menu).toHaveAttribute('inert', '');
    await page.locator('.header__logo').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('.header__contact')).toBeFocused();
    await burger.click();
    await expect(menu).not.toHaveAttribute('inert', '');
    await expect(page.locator('.header__nav-close')).toBeFocused();
    await expect(page.locator('.header__overlay')).toBeVisible();
    const coverage = await page.locator('.header__overlay').evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      width: el.getBoundingClientRect().width,
      pageWidth: document.body.getBoundingClientRect().width,
      portal: el.parentElement === document.body,
      hit: document.elementFromPoint(5, 400) === el,
    }));
    expect(coverage).toMatchObject({ height: 844, portal: true, hit: true });
    expect(coverage.width).toBe(coverage.pageWidth);
    await page.mouse.click(5, 400);
    await expect(page.locator('.header__overlay')).toHaveCount(0);
    await expect(burger).toBeFocused();
    await burger.click();
    await page.keyboard.press('Escape');
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await burger.click();
    await page.locator('.header__nav-close').click();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await burger.click();
    await page.locator('.header__nav a[href="/zc33s/tuning"]').click();
    await expect(page).toHaveURL(/\/tuning$/);
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await burger.click();
    await page.setViewportSize({ width: 1400, height: 900 });
    await expect(page.locator('.header__overlay')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('');
    await expect(page.locator('.header .header__nav')).toBeVisible();
    await expect(menu).not.toHaveAttribute('inert', '');
  });
}

for (const lang of ['ru', 'en']) {
  test(`article links: direct load, TOC, history, reload (${lang})`, async ({ page }) => {
    await page.addInitScript((language) => localStorage.setItem('sst_lang', language), lang);
    await page.goto('knowledge/zc33s-faq/#section-12');
    await expectAnchor(page, 12);
    await page.locator('.faq-article__toc a[href$="#section-3"]').click();
    await expectAnchor(page, 3);
    await page.goBack();
    await expectAnchor(page, 12);
    await page.goForward();
    await expectAnchor(page, 3);
    await page.reload();
    await expectAnchor(page, 3);
    // Повторное нажатие той же ссылки тоже возвращает к разделу.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.locator('.faq-article__toc a[href$="#section-3"]').click();
    await expectAnchor(page, 3);
    const nextLang = lang === 'ru' ? 'en' : 'ru';
    await page.locator('.header__lang--desktop button').filter({ hasText: nextLang.toUpperCase() }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', nextLang);
    await expectAnchor(page, 3);
  });

  test(`routes and card modal (${lang})`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.addInitScript((language) => localStorage.setItem('sst_lang', language), lang);
    const paths = ['', 'tuning/', 'custom/', 'knowledge/', 'about/', 'service/', 'warranty/',
      'consultations/', 'privacy/', 'legal/', 'catalog/', 'faq/?module=01', 'purchase/', 'nonexistent'];
    for (const path of paths) {
      await page.goto(path || './');
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('.page--error')).toHaveCount(0);
    }
    for (const slug of ['zc33s-faq', 'ecu-flashing', 'tuning-stages', 'buying-zc33s', 'diagnostics', 'hardware']) {
      await page.goto(`knowledge/${slug}/`);
      await expect(page.locator('.faq-article__content')).toBeVisible();
      await expect(page.locator('#section-1')).toHaveCount(1);
      await expect(page.locator('.article-meta, .knowledge-article__reading-time')).toHaveCount(0);
    }
    await page.goto('custom/');
    await page.locator('.tuning-card').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('knowledge filters work with keyboard and expose selected state', async ({ page }) => {
  await page.goto('knowledge/');
  await expect(page.locator('.knowledge-card')).toHaveCount(6);
  await expect(page.locator('.knowledge-card__time')).toHaveCount(0);
  const category = page.locator('.knowledge-cat-card').filter({ hasText: 'ECU' });
  await category.focus();
  await page.keyboard.press('Enter');
  await expect(category).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.knowledge-filter-btn').filter({ hasText: /^ECU$/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.knowledge-card')).toHaveCount(3);
  const all = page.locator('.knowledge-filter-btn').first();
  await all.focus();
  await page.keyboard.press('Space');
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  await expect(category).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.knowledge-card')).toHaveCount(6);
});

test('home loads one photo format and does not load article bodies', async ({ page }) => {
  const resources = [];
  page.on('request', (request) => resources.push(request.url()));
  await page.goto('./');
  await expect(page.locator('.home__hero')).toBeVisible();
  await expect.poll(() => resources.some((url) => url.includes('main_page-1920.webp'))).toBe(true);
  expect(resources.some((url) => url.includes('main_page-1920.jpg'))).toBe(false);
  expect(resources.some((url) => /\/(faqShort|faqBuyGuide|faqFlashGuides|faqSelfFlashing|zc33s-faq|ecu-flashing|buying-zc33s|tuning-stages|diagnostics|hardware)-[^/]+\.js/.test(url))).toBe(false);
});

test('article chunk failure is recoverable by navigating to another section', async ({ page }) => {
  await page.route('**/assets/faqShort-*.js', (route) => route.abort());
  await page.goto('knowledge/zc33s-faq/');
  await expect(page.locator('.page--error')).toBeVisible();
  await page.locator('.page__error-link').click();
  await expect(page.locator('.home__hero')).toBeVisible();
  await expect(page.locator('.page--error')).toHaveCount(0);
});

test('mobile article: TOC persists hash and Back returns to the article top', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('knowledge/zc33s-faq/');
  await expect(page.locator('.faq-article__content')).toBeVisible();
  await page.locator('.faq-article__toc a[href$="#section-3"]').click();
  await expectAnchor(page, 3);
  await page.goBack();
  await expect(page).not.toHaveURL(/#section-/);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  // Некорректный percent-encoding в URL не должен ломать страницу.
  await page.goto('knowledge/zc33s-faq/#%invalid');
  await expect(page.locator('.faq-article__content')).toBeVisible();
  await expect(page.locator('.page--error')).toHaveCount(0);
});
