import type { ThemeRegistration } from 'shiki'

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import uno from '@subf/unocss/vite'
import { codeToHtml } from 'shiki'
import { fileRouter } from 'solid-file-router/plugin'
import { defineConfig } from 'vite'
import { intlayer } from 'vite-intlayer'
import solid from 'vite-plugin-solid'

import { markdownPlugins } from './build/markdown.ts'
import { normalFeatureArray } from './data/features/features.ts'
import samples from './src/assets/code-samples.ts'
import theme from './src/assets/maple-dark-color-theme.json' with { type: 'json' }
import { pageMetadata } from './src/utils/metadata.ts'
import unocfg from './uno.config.ts'

const base = `/${(process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/')
const origin = (process.env.VITE_SITE_ORIGIN ?? 'https://font.subf.dev').replace(/\/$/, '')
export default defineConfig({
  base,
  plugins: [
    uno(unocfg),
    solid({ ssr: true, extensions: ['.mdx', '.md'] }),
    intlayer(),
    fileRouter({
      mdx: {
        ...markdownPlugins(base),
        extendLoad(_document, context) {
          const [, locale, file] = context.sourcePath.replaceAll('\\', '/').match(/\/pages\/(en|zh-cn)\/(usage|download)\.mdx$/) ?? []
          if (!locale || !file) {
            return
          }
          return {
            routeConfig: { metadata: pageMetadata(locale as 'en' | 'zh-cn', file as 'usage' | 'download', base, origin) },
            mdxContent: `<components.DocumentLayout page="${file}"><MDXContent {...props} /></components.DocumentLayout>`,
          }
        },
      },
      ssg: { id: 'app', concurrency: 4 },
    }),
    {
      name: 'maple-code-highlights',
      resolveId(id) {
        if (id === 'virtual:code-highlights') {
          return '\0maple-code-highlights'
        }
      },
      async load(id) {
        if (id !== '\0maple-code-highlights') {
          return
        }
        const languages: Record<string, string> = { code: 'jsonc', normalCode: 'typescript', tsxCode: 'tsx', vueCode: 'vue', javaCode: 'java', goCode: 'go', pythonCode: 'python', cppCode: 'cpp' }
        const examples = [...Object.entries(samples).map(([key, code]) => [languages[key], code]), ['text', `"${normalFeatureArray.join('", "')}"`]]
        const entries = await Promise.all(examples.map(async ([lang, code]) => [`${lang}:${code}`, await codeToHtml(code!, { lang: lang!, theme: theme as unknown as ThemeRegistration })]))
        return `export default ${JSON.stringify(Object.fromEntries(entries))}`
      },
    },
    // Fonttools serves its Python assets only when the browser patcher is used in dev.
    ...(process.env.NODE_ENV === 'development' ? [(await import('@subframe7536/fonttools/vite')).fonttools()] : []),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)), '@data': fileURLToPath(new URL('./data', import.meta.url)) }, dedupe: ['solid-js', '@solidjs/router'] },
  define: { __PY_SCRIPT__: JSON.stringify(readFileSync('./data/script.py', 'utf8')) },
})
