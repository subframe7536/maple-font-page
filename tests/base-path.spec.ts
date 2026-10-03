import { expect, test } from '@playwright/test'

const base = process.env.BASE_PATH?.replace(/\/$/, '')
test.skip(!base, 'This check requires a repository base-path build')

test('localized navigation and MDX links retain the Pages base path', async ({ page }) => {
  const response = await page.goto(`${base}/zh-cn/usage/`)
  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('使用文档 | Maple Mono')
  await expect(page.getByRole('link', { name: '字体下载', exact: true })).toHaveAttribute('href', `${base}/zh-cn/download`)
  await page.getByRole('link', { name: '字体下载', exact: true }).click()
  await expect(page.locator('main').getByRole('link', { name: '特性测试', exact: true })).toHaveAttribute('href', `${base}/zh-cn/playground`)
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL(new RegExp(`${base}/en/download$`))
  await expect(page).toHaveTitle('Download | Maple Mono')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://subframe7536.github.io${base}/en/download`)
})
