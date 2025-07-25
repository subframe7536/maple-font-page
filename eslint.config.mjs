import { defineEslintConfig } from '@subframe7536/eslint-config'

export default defineEslintConfig({
  astro: true,
  unocss: true,
  vue: false,
  ignoreAll: ['./data'],
})
