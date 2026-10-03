import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// SSG renders each route independently; stamp its document language and alternates.
// Both paths below are the same inputs used by Vite and the Pages workflow.
const output = resolve('dist/client')
const base = `/${(process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/')
const origin = (process.env.VITE_SITE_ORIGIN ?? 'https://font.subf.dev').replace(/\/$/, '')
const urls: string[] = []
for (const locale of ['en', 'zh-cn']) {
  for (const page of ['', 'usage', 'download', 'playground']) {
    const flatFilename = resolve(output, page ? `${locale}/${page}.html` : `${locale}.html`)
    const directory = resolve(output, locale, page)
    mkdirSync(directory, { recursive: true })
    const filename = resolve(directory, 'index.html')
    const suffix = page ? `/${page}` : '/'
    let html = readFileSync(flatFilename, 'utf8').replace('<html lang="en"', `<html lang="${locale === 'en' ? 'en' : 'zh-CN'}"`)
    html = html.replace(/<link rel="alternate" href="([^"]+)"\s*\/?>/g, (_tag, href: string) => `<link rel="alternate" hreflang="${href.includes('/zh-cn') ? 'zh-CN' : 'en'}" href="${href}">`)
    writeFileSync(flatFilename, html)
    writeFileSync(filename, html)
    urls.push(`${origin}${base}${locale}${suffix}`)
  }
}
writeFileSync(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`)
const robots = `User-agent: *\nAllow: /\nSitemap: ${origin}${base}sitemap.xml\n`
writeFileSync(resolve(output, 'robots.txt'), robots)
// Preserve the old (singular) robots endpoint as well.
writeFileSync(resolve(output, 'robot.txt'), robots)
