import { readFileSync } from 'node:fs'

import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'
import unocss from '@unocss/astro'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeSlug from 'rehype-slug'
// import remarkToc from 'remark-toc'
import { defineConfig } from 'astro/config'

import mapleTheme from './src/assets/maple-dark-color-theme.json'
import { DEFAULT_LOCALE, LOCALES_SETTING } from './src/utils/constant'

// https://astro.build/config
export default defineConfig({
  site: 'https://font.subf.dev',
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
    // remarkPlugins: [[remarkToc, { heading: 'TOC' }]],
    // rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
  vite: {
    plugins: process.env.NODE_ENV === 'development'
      ? [import('@subframe7536/fonttools/vite').then(m => m.fonttools())]
      : [],
    define: {
      __PY_SCRIPT__: JSON.stringify(readFileSync('./data/script.py', 'utf-8')),
    },
  },
})
