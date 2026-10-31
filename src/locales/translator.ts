import * as i18n from '@solid-primitives/i18n'

import downloadEn from './download/en.ts'
import downloadZh from './download/zh-cn.ts'
import indexEn from './index/en.ts'
import indexZh from './index/zh-cn.ts'
import navEn from './nav/en.ts'
import navZh from './nav/zh-cn.ts'
import playgroundEn from './playground/en.ts'
import playgroundZh from './playground/zh-cn.ts'

export const LOCALES = ['en', 'zh-cn'] as const
export type SiteLocale = (typeof LOCALES)[number]

const en = { index: indexEn, nav: navEn, download: downloadEn, playground: playgroundEn }
export type RawDictionary = typeof en
export type Dictionary = i18n.Flatten<RawDictionary>

const zh: RawDictionary = {
  index: indexZh,
  nav: navZh,
  download: downloadZh,
  playground: playgroundZh,
}

// Dictionaries are small and both are needed for prerendering, so they are bundled eagerly.
const dictionaries: Record<SiteLocale, Dictionary> = {
  en: i18n.flatten(en),
  'zh-cn': i18n.flatten(zh),
}

export type Translator = i18n.Translator<Dictionary>

export function createTranslator(locale: () => SiteLocale): Translator {
  return i18n.translator(() => dictionaries[locale()], i18n.resolveTemplate)
}
