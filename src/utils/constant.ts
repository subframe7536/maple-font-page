import { version } from '../../package.json'

export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'

export const fontPrefix = isDEV
  ? `/fonts`
  : `${myGhCdnPrefix}/maple-font@v${version.split('.', 2).join('.')}/woff2/var`

export const DEFAULT_LOCALE: string = 'en'

export const LOCALES_SETTING = {
  'en': {
    label: 'English',
    lang: 'en-US',
  },
  'zh-cn': {
    label: '简体中文',
    lang: 'zh-CN',
  },
} as const
