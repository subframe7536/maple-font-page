export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'
export const baseURL = import.meta.env.SERVER_BASE_URL

// export const shikiCoreImport: Promise<typeof import('shiki/core')> = isDEV
//   ? import('shiki/core')
//   : import(/* @vite-ignore */`${cdnPrefix}/shiki/core`)

// export const fonttoolsImport: Promise<typeof import('@subframe7536/fonttools')> = isDEV
//   ? import('@subframe7536/fonttools')
//   : import(/* @vite-ignore */`${cdnPrefix}/@subframe7536/fonttools`)

// export const shikiJsEngineImport: Promise<typeof import('shiki/engine-javascript.mjs')> = isDEV
//   ? import('shiki/engine-javascript.mjs')
//   : import(/* @vite-ignore */`${cdnPrefix}/shiki/engine-javascript.mjs`)

// export const shikiTypescriptImport: Promise<typeof import('shiki/langs/typescript.mjs')> = isDEV
//   ? import('shiki/langs/typescript.mjs')
//   : import(/* @vite-ignore */`${cdnPrefix}/shiki/langs/typescript.mjs`)
export const themeJsonURL = isDEV
  ? `http://localhost:3000${baseURL}/maple-dark-color-theme.json`
  : `${myGhCdnPrefix}/vscode-theme-maple@main/themes/maple-dark-color-theme.json`
