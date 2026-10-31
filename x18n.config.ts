import { defineConfig } from '@x18n/core'

export default defineConfig({
  sourceLocale: 'en',
  presets: ['solid-primitives-i18n'],
  resources: [{ pattern: 'src/locales/{namespace}/{locale}.ts' }],
})
