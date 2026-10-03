import type { IntlayerConfig } from 'intlayer'

export default {
  internationalization: { locales: ['en', 'zh-CN'], defaultLocale: 'en' },
  routing: { enableProxy: false },
  content: { contentDir: ['./src'] },
} satisfies IntlayerConfig
