import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const output = resolve('dist/client')
const base = `/${(process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/')
const origin = process.env.VITE_SITE_ORIGIN ?? 'https://font.subf.dev'
for (const locale of ['en', 'zh-cn']) {
  for (const page of ['', 'usage', 'download', 'playground']) {
    test(`SSG ${locale}/${page}: content, metadata and assets`, () => {
      const html = readFileSync(resolve(output, locale, page, 'index.html'), 'utf8')
      assert.match(html, new RegExp(`<html lang="${locale === 'en' ? 'en' : 'zh-CN'}"`))
      assert.ok(
        html.includes(`rel="canonical" href="${origin}${base}${locale}${page ? `/${page}` : '/'}"`),
      )
      assert.ok(html.includes('hreflang="en"'))
      assert.ok(html.includes('hreflang="zh-CN"'))
      assert.match(html, /<main[^>]*>[\s\S]+<\/main>/)
      assert.ok(html.includes(`href="${base}${locale}/usage"`))
      for (const [, url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
        if (url.startsWith(`${base}assets/`) || url.startsWith(`${base}favicon`)) {
          assert.ok(
            existsSync(resolve(output, url.slice(base.length))),
            `Missing generated asset: ${url}`,
          )
        }
      }
      if (page === 'download') {
        assert.match(html, /releases\/download\/v7\.9/)
        assert.match(html, /class="shiki/)
      }
      if (page === 'playground') {
        assert.match(html, /Maple Mono, smooth your coding flow/)
        assert.match(html, /data-slot="slider-/)
      }
      if (!page) {
        for (const section of ['why', 'features', 'preview', 'credits']) {
          assert.ok(html.includes(`id="${section}"`), `Missing ${section} section`)
        }
      }
    })
  }
}
test('crawler files and localized fallback', () => {
  assert.match(readFileSync(resolve(output, '404.html'), 'utf8'), /404 PAGE NOT FOUND/)
  assert.match(readFileSync(resolve(output, 'robots.txt'), 'utf8'), /Sitemap:/)
  const sitemap = readFileSync(resolve(output, 'sitemap.xml'), 'utf8')
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 8)
  assert.ok(sitemap.includes(`${origin}${base}zh-cn/download`))
})
