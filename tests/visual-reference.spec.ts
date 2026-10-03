import { readFileSync } from 'node:fs'

import { expect, test } from '@playwright/test'

// Optional migration review: capture the same pages from the pre-migration build.
// CI supplies BASELINE_URL; these are review artifacts, not unreviewed pixel goldens.
test.skip(!process.env.BASELINE_URL, 'Set BASELINE_URL to compare the original Astro build')
for (const locale of ['en', 'zh-cn']) {
  for (const route of ['', 'usage', 'download', 'playground']) {
    test(`original ${locale}/${route}`, async ({ page, context }, testInfo) => {
      await context.route('https://esm.sh/gh/subframe7536/maple-font@*/woff2/var/*', request => request.fulfill({
        contentType: 'font/woff2',
        body: readFileSync(`public/fonts/MapleMono${request.request().url().includes('Italic') ? '-Italic' : ''}[wght]-VF.woff2`),
        headers: { 'access-control-allow-origin': '*' },
      }))
      await page.goto(`${process.env.BASELINE_URL}/${locale}/${route}`)
      await expect(page.locator('nav')).toBeVisible()
      // The original title waits for an animation iteration after font loading.
      if (!route) {
        await expect(page.locator('h1 [class*="animate-typing"]')).toBeVisible()
      }
      const cancel = page.getByRole('button', { name: '取消', exact: true })
      if (await cancel.isVisible()) {
        await cancel.click()
      }
      await page.screenshot({ path: testInfo.outputPath('original.png'), animations: 'disabled' })
      if (!route) {
        for (const id of ['features', 'preview', 'credits']) {
          await page.locator(`#${id}`).scrollIntoViewIfNeeded()
          await page.screenshot({ path: testInfo.outputPath(`original-${id}.png`), animations: 'disabled' })
        }
      }
    })
  }
}
