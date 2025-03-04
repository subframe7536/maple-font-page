import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'
import unocss from '@unocss/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://font.subf.dev',
  integrations: [
    unocss({
      injectReset: true,
      injectEntry: import.meta.env.DEV,
      mode: 'dist-chunk',
    }),
    solidJs(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: await import('./src/assets/maple-dark-color-theme.json'),
    },
  },
})
