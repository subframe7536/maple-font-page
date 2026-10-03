import type { Dictionary } from 'intlayer'

import { t } from 'intlayer'

import en from './en'
import zh from './zh-cn'

export default {
  key: 'nav',
  content: { messages: t({ en, 'zh-CN': zh }) },
} satisfies Dictionary
