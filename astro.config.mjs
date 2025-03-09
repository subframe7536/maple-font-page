import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'
import unocss from '@unocss/astro'
import { defineConfig } from 'astro/config'

import mapleTheme from './src/assets/maple-dark-color-theme.json'

// https://astro.build/config
export default defineConfig({
  site: 'https://font.subf.dev',
  // adapter: netlifyIntegration(),
  integrations: [
    unocss({ injectReset: true }),
    solidJs(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: mapleTheme,
    },
  },
})
