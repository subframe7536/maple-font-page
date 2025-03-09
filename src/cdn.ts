export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'
export const baseURL = import.meta.env.SERVER_BASE_URL

export const themeJsonURL = isDEV
  ? `http://localhost:3000${baseURL}/maple-dark-color-theme.json`
  : `${myGhCdnPrefix}/vscode-theme-maple@main/themes/maple-dark-color-theme.json`
