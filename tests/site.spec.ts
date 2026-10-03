import type { Page } from '@playwright/test'

import { readFileSync } from 'node:fs'

import { expect, test } from '@playwright/test'

// Use the checked-in font so assertions and captures do not depend on the CDN.
test.beforeEach(async ({ context }) => {
  await context.route('https://esm.sh/gh/subframe7536/maple-font@*/woff2/var/*', route => route.fulfill({
    contentType: 'font/woff2',
    body: readFileSync(`public/fonts/MapleMono${route.request().url().includes('Italic') ? '-Italic' : ''}[wght]-VF.woff2`),
    headers: { 'access-control-allow-origin': '*' },
  }))
})
async function closeChinesePrompt(page: Page) {
  const cancel = page.getByRole('button', { name: '取消', exact: true })
  await expect(cancel).toBeVisible()
  await cancel.click()
}
for (const locale of ['en', 'zh-cn']) {
  for (const route of ['', 'usage', 'download', 'playground']) {
    test(`${locale}/${route} renders and hydrates`, async ({ page }, testInfo) => {
      const errors: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      const response = await page.goto(`/${locale}/${route}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'en' ? 'en' : 'zh-CN')
      await expect(page.locator('nav')).toBeVisible()
      await expect(page.locator('main')).not.toBeEmpty()
      if (route === 'playground') {
        await expect(page.getByTitle('Playground for Maple Mono')).toHaveValue(/Maple Mono, smooth your coding flow/)
        if (locale === 'zh-cn') {
          await closeChinesePrompt(page)
        }
        await expect(page.getByRole('button', { name: locale === 'en' ? 'Load Chinese Font' : '加载中文字体', exact: true })).toBeEnabled()
      }
      if (route === 'download') {
        await expect(page.locator('.prose pre').first()).toBeVisible()
      }
      if (route === '') {
        await expect(page.locator('h1').getByText('Maple Mono', { exact: true })).toBeVisible()
      }
      expect(errors).toEqual([])
      await page.screenshot({ path: testInfo.outputPath('page.png'), animations: 'disabled' })
      if (!route) {
        for (const id of ['features', 'preview', 'credits']) {
          await page.locator(`#${id}`).evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'start' }))
          await page.screenshot({ path: testInfo.outputPath(`${id}.png`), animations: 'disabled' })
        }
      }
    })
  }
}

test('playground edits, tabs, sliders and generated config', async ({ page }) => {
  await page.goto('/en/playground/')
  const sample = page.getByTitle('Playground for Maple Mono')
  await expect(page.getByRole('button', { name: 'Load Chinese Font', exact: true })).toBeEnabled()
  await sample.fill('custom test !==')
  await page.getByRole('tab', { name: 'Italic', exact: true }).click()
  await expect(sample).toHaveCSS('font-style', 'italic')
  await page.getByRole('tab', { name: 'Narrow', exact: true }).click()
  const size = page.getByRole('slider', { name: 'Font Size', exact: true }).first()
  await size.focus()
  await page.keyboard.press('ArrowRight')
  await expect(sample).toHaveCSS('font-size', '25px')
  const feature = page.getByRole('tablist', { name: 'cv02', exact: true })
  await feature.getByRole('tab').last().click()
  await page.getByRole('button', { name: 'Generate Config', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('textarea[name="json"]')).toHaveValue(/"cv02": "enable"/)
  await dialog.getByRole('checkbox', { name: 'Bundle CN / JP Glyphs', exact: true }).check()
  await expect(dialog.locator('textarea[name="json"]')).toHaveValue(/"cn":\s*\{\s*"enable": true/)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Generate Config', exact: true })).toBeFocused()
  await expect(sample).toHaveValue('custom test !==')
})

test('custom build upload, removal and nested format selector', async ({ page }) => {
  await page.goto('/en/playground')
  await page.getByRole('button', { name: 'Custom Build', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.locator('input[type="file"]').setInputFiles({ name: 'font.zip', mimeType: 'application/zip', buffer: Buffer.from('PK') })
  await expect(dialog.getByText('font.zip', { exact: true })).toBeVisible()
  await dialog.locator('[data-slot="file-upload-file-remove"]').click()
  await expect(dialog.getByText('font.zip', { exact: true })).toHaveCount(0)
  await dialog.getByRole('tab', { name: 'Auto Download', exact: true }).click()
  await dialog.getByRole('combobox').click()
  await page.getByRole('option', { name: 'TTF', exact: true }).click()
  await expect(dialog).toBeVisible()
  await expect(dialog.getByText(/https:\/\/cors.*MapleMono-TTF\.zip/)).toBeVisible()
  await dialog.getByRole('combobox').click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('listbox')).toHaveCount(0)
  await expect(dialog.getByRole('combobox')).toBeFocused()
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('language switch, SPA navigation, metadata, and history', async ({ page }) => {
  await page.goto('/en/usage/')
  await page.getByRole('link', { name: '简体中文', exact: true }).click()
  await expect(page).toHaveURL(/\/zh-cn\/usage/)
  await expect(page).toHaveTitle('使用文档 | Maple Mono')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.locator('main')).toContainText('GitHub 中的文档')
  await page.getByRole('link', { name: '字体下载', exact: true }).click()
  await expect(page).toHaveURL(/\/zh-cn\/download/)
  await expect(page.locator('main')).toContainText('字体')
  await page.goBack()
  await expect(page).toHaveTitle('使用文档 | Maple Mono')
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveTitle('Usage | Maple Mono')
  await expect(page.locator('main')).toContainText('Documents in GitHub')
  const current = page.locator('nav [aria-current="page"]')
  await expect(current).toHaveAccessibleName('Usage')
  await expect(current).toHaveCSS('color', 'rgb(164, 204, 177)')
  await expect(current).toHaveCSS('box-shadow', 'none')
})

test('editing while fonts load preserves text and dialog focus', async ({ page, context }) => {
  let release!: () => void
  const loaded = new Promise<void>((resolve) => {
    release = resolve
  })
  let requests = 0
  await context.route('https://esm.sh/gh/subframe7536/maple-font@*/woff2/var/*', async (route) => {
    requests++
    await loaded
    await route.fulfill({
      contentType: 'font/woff2',
      body: readFileSync(`public/fonts/MapleMono${route.request().url().includes('Italic') ? '-Italic' : ''}[wght]-VF.woff2`),
      headers: { 'access-control-allow-origin': '*' },
    })
  })
  try {
    await page.goto('/en/playground/', { waitUntil: 'domcontentloaded' })
    await expect.poll(() => requests).toBe(2)
    const sample = page.getByTitle('Playground for Maple Mono')
    await sample.fill('Keep my text while the font loads')
    await page.getByRole('button', { name: 'Generate Config', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await dialog.locator('textarea[name="json"]').focus()
    release()
    await expect(page.getByRole('button', { name: 'Load Chinese Font', exact: true })).toBeEnabled()
    await expect(dialog.locator('textarea[name="json"]')).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(sample).toHaveValue('Keep my text while the font loads')
  } finally {
    release()
  }
})

test('home feature controls, font comparison and testimonial keyboard navigation', async ({ page }) => {
  await page.goto('/en/')
  const features = page.locator('#features')
  const ligatures = features.getByRole('tablist', { name: 'calt', exact: true })
  await ligatures.getByRole('tab', { name: 'Ligature OFF', exact: true }).click()
  await expect(features.locator('[style*="--feat-calt"]')).toHaveCSS('--feat-calt', '0')
  const feature = features.getByRole('switch').first()
  const checked = await feature.getAttribute('aria-checked')
  await feature.click()
  await expect(feature).toHaveAttribute('aria-checked', checked === 'true' ? 'false' : 'true')
  const comparison = page.locator('#comparison')
  await comparison.getByRole('tab', { name: 'Fira Code', exact: true }).click()
  await expect(comparison.getByRole('tabpanel')).toContainText('Cloudflare')
  await comparison.getByRole('switch', { name: 'Italic', exact: true }).check()
  await expect(comparison.getByRole('tabpanel').locator('> div')).toHaveCSS('font-style', 'italic')
  const testimonial = page.getByRole('button', { name: 'Show testimonial 2', exact: true })
  await testimonial.scrollIntoViewIfNeeded()
  await testimonial.focus()
  await page.keyboard.press('Enter')
  await expect(testimonial).toHaveAttribute('aria-pressed', 'true')
})

test('browser locale redirect and unknown routes', async ({ browser, page }) => {
  const context = await browser.newContext({ locale: 'zh-CN' })
  const localized = await context.newPage()
  await localized.goto('http://127.0.0.1:4173/?normal#features')
  await expect(localized).toHaveURL(/\/zh-cn\/\?normal#features$/)
  await context.close()
  const response = await page.goto('/does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: '404 PAGE NOT FOUND' })).toBeVisible()
})

test('MDX documents work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/zh-cn/download/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.locator('.prose pre').first()).toBeVisible()
  await expect(page.getByRole('link', { name: '使用文档', exact: true })).toBeVisible()
  await page.goto('http://127.0.0.1:4173/en/playground/')
  await expect(page.getByTitle('Playground for Maple Mono')).toHaveValue(/Maple Mono, smooth your coding flow/)
  await context.close()
})

test('Fonttools worker patches and downloads an uploaded font', async ({ page }) => {
  test.setTimeout(120_000)
  await page.goto('/en/playground')
  await page.getByRole('tablist', { name: 'cv02', exact: true }).getByRole('tab').last().click()
  await page.getByRole('button', { name: 'Custom Build', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await dialog.locator('input[type="file"]').setInputFiles('tests/fixtures/font.zip')
  const build = dialog.getByRole('button', { name: 'Build and Download', exact: true })
  await expect(build).toBeEnabled({ timeout: 90_000 })
  const pending = page.waitForEvent('download')
  await build.click()
  const download = await pending
  expect(download.suggestedFilename()).toBe('font-patch.zip')
  const bytes = readFileSync((await download.path())!)
  expect(bytes.includes(Buffer.from('MigrationTest.ttf'))).toBe(true)
  expect(bytes.includes(Buffer.from('patch-in-browser.json'))).toBe(true)
  expect(bytes.includes(Buffer.from('"cv02": "freeze"'))).toBe(true)
})
