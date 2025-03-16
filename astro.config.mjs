import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'
import unocss from '@unocss/astro'
import { defineConfig } from 'astro/config'

import mapleTheme from './src/assets/maple-dark-color-theme.json'
import { DEFAULT_LOCALE, LOCALES_SETTING } from './src/utils/constant'

// https://astro.build/config
export default defineConfig({
  // adapter: netlifyIntegration(),
  integrations: [
    unocss({ injectReset: true }),
    solidJs(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: Object.keys(LOCALES_SETTING),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: mapleTheme,
    },
  },
})
