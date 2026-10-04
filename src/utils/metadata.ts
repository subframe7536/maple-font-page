import type { RouteMetadata } from 'solid-file-router'

import type { SiteLocale } from '@/locales/i18n'

import navEn from '../locales/nav/en.ts'
import navZh from '../locales/nav/zh-cn.ts'

export const SITE_ORIGIN = 'https://font.subf.dev'
const description =
  'Open source monospace font with round corner, ligatures and Nerd-Font for IDE and terminal, fine-grained customization options.'
const image =
  'https://repository-images.githubusercontent.com/479451389/00c67e39-1c75-43d6-8e0e-b0b831c0cb85'
export function pageMetadata(
  locale: SiteLocale,
  page?: keyof typeof navEn.titles,
  base = import.meta.env.BASE_URL,
  origin = import.meta.env.VITE_SITE_ORIGIN ?? SITE_ORIGIN,
): RouteMetadata {
  const title = page
    ? `${(locale === 'en' ? navEn : navZh).titles[page]} | Maple Mono`
    : 'Maple Mono: Open source monospace font'
  const suffix = page ? `/${page}` : '/'
  const url = `${origin}${base}${locale}${suffix}`
  return {
    title,
    description,
    canonical: url,
    meta: [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: 'Maple Mono' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: locale === 'en' ? 'en_US' : 'zh_CN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [
      { rel: 'alternate', href: `${origin}${base}en${suffix}` },
      { rel: 'alternate', href: `${origin}${base}zh-cn${suffix}` },
    ],
  }
}
