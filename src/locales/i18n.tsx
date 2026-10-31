import type { Accessor, ParentProps } from 'solid-js'
import { createContext, useContext } from 'solid-js'

import type { SiteLocale, Translator } from './translator'
import { createTranslator } from './translator'

export { LOCALES } from './translator'
export type { SiteLocale, Translator } from './translator'

interface I18nContextValue {
  locale: Accessor<SiteLocale>
  t: Translator
}

const I18nContext = createContext<I18nContextValue>()

export function I18nProvider(props: ParentProps<{ locale: SiteLocale }>) {
  const locale = () => props.locale
  return (
    <I18nContext.Provider value={{ locale, t: createTranslator(locale) }}>
      {props.children}
    </I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside <I18nProvider>')
  }
  return context
}

export function siteLocale(): SiteLocale {
  return useI18n().locale()
}
// SSG receives unprefixed routes; the browser can live under a Pages base path.
export function routePath(pathname: string) {
  const base = import.meta.env.BASE_URL
  return base !== '/' && pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname
}
export function localePath(locale: SiteLocale = siteLocale(), page = '') {
  return `${import.meta.env.BASE_URL}${locale}${page ? `/${page}` : '/'}`
}
