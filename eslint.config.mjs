import { defineEslintConfig } from '@subframe7536/eslint-config'

export default defineEslintConfig({
  astro: false,
  unocss: false,
  vue: false,
  ignoreAll: ['./data'],
})
