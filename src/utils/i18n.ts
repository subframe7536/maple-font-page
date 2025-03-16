import type { IndexTranslation } from '@/locales/index/en'
import type { NavTranslation } from '@/locales/nav/en'
import type { PlaygroundTranslation } from '@/locales/playground/en'

// reference from https://github.com/psephopaiktes/astro-i18n-starter/blob/main/src/i18n.ts
import { getRelativeLocaleUrl } from 'astro:i18n'

import { DEFAULT_LOCALE, LOCALES_SETTING } from './constant'

export const LOCALES = Object.keys(LOCALES_SETTING) as unknown as (keyof typeof LOCALES_SETTING)[]

async function useTranslation(
  namespace: 'index' | 'playground' | 'nav',
  locale = DEFAULT_LOCALE,
): Promise<any> {
  return (await import(`../locales/${namespace}/${locale}.ts`)).default
}

export async function useIndexTranslation<K extends keyof IndexTranslation>(
  locale: string | undefined,
  section: K,
): Promise<IndexTranslation[K]> {
  return (await useTranslation('index', locale))[section]
}

export async function useFeatureTranslation<K extends keyof IndexTranslation['features']>(
  locale: string | undefined,
  section: K,
): Promise<IndexTranslation['features'][K]> {
  return (await useTranslation('index', locale)).features[section]
}

export async function usePlaygroundTranslation(
  locale: string | undefined,
): Promise<PlaygroundTranslation> {
  return (await useTranslation('playground', locale))
}

export async function useNavTranslation(
  locale: string | undefined,
): Promise<NavTranslation> {
  return (await useTranslation('nav', locale))
}
/**
 * Helper to get corresponding path list for all locales
 * @param url - The current URL object
 * @returns - The list of locale paths
 */
export function getLocalePaths(url: URL) {
  return LOCALES.map((lang) => {
    return {
      lang,
      path: getRelativeLocaleUrl(lang, url.pathname.replace(/^\/[a-z-]+/i, '')),
    }
  })
}

/**
 * Helper to get locale parms for Astro's `getStaticPaths` function
 * @returns - The list of locale params
 * @see https://docs.astro.build/en/guides/routing/#dynamic-routes
 */
export function getStaticPaths() {
  return LOCALES.map(lang => ({
    params: { lang },
  }))
}
