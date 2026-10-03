import pkg from '../../package.json' with { type: 'json' }

const { version } = pkg

export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env?.DEV ?? process.env.NODE_ENV === 'development'

export const tag = `v${version.split('.', 2).join('.')}`
export const fontPrefix = isDEV
  ? `${(import.meta.env?.BASE_URL ?? '/')}fonts`
  : `${myGhCdnPrefix}/maple-font@${tag}/woff2/var`

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
