import { useExternal } from '@solid-hooks/core/web'

export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'

export const fontPrefix = isDEV ? `/fonts` : `${myGhCdnPrefix}/maple-font@variable/woff2/var`
