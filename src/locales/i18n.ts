import { getIntlayer } from 'intlayer'
import { useLocale } from 'solid-intlayer'

import type { DownloadTranslation } from './download/en'
import type { IndexTranslation } from './index/en'
import type { NavTranslation } from './nav/en'
import type { PlaygroundTranslation } from './playground/en'

export const LOCALES = ['en', 'zh-cn'] as const
export type SiteLocale = (typeof LOCALES)[number]
export function siteLocale(): SiteLocale {
  return useLocale().locale() === 'zh-CN' ? 'zh-cn' : 'en'
}
// SSG receives unprefixed routes; the browser can live under a Pages base path.
export function routePath(pathname: string) {
  const base = import.meta.env.BASE_URL
  return base !== '/' && pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname
}
export function localePath(locale: SiteLocale = siteLocale(), page = '') {
  return `${import.meta.env.BASE_URL}${locale}${page ? `/${page}` : '/'}`
}
function intlayerLocale(locale = siteLocale()) {
  return locale === 'zh-cn' ? 'zh-CN' : 'en'
}
export function useIndexTranslation<K extends keyof IndexTranslation>(
  locale: SiteLocale | undefined,
  section: K,
): IndexTranslation[K] {
  return (getIntlayer('index', intlayerLocale(locale)).messages as IndexTranslation)[section]
}
export function useFeatureTranslation<K extends keyof IndexTranslation['features']>(
  locale: SiteLocale | undefined,
  section: K,
): IndexTranslation['features'][K] {
  return (getIntlayer('index', intlayerLocale(locale)).messages as IndexTranslation).features[
    section
  ]
}
export function usePlaygroundTranslation(locale?: SiteLocale): PlaygroundTranslation {
  return getIntlayer('playground', intlayerLocale(locale)).messages
}
export function useNavTranslation(locale?: SiteLocale): NavTranslation {
  return getIntlayer('nav', intlayerLocale(locale)).messages
}
export function useDownloadTranslation(locale?: SiteLocale): DownloadTranslation {
  return getIntlayer('download', intlayerLocale(locale)).messages
}
