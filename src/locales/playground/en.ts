import type { FeatureDescription } from '@data/features/features'

const description: FeatureDescription = {
  calt: 'Enable ligatures',
  zero: 'Alternative zero',
  cv01: 'Remove gaps',
  cv02: 'Alternative a',
  cv03: 'Alternative i',
  cv04: 'Alternative l',
  cv31: 'Alternative a',
  cv32: 'Alternative f',
  cv33: 'Alternative i and j',
  cv34: 'Alternative k',
  cv35: 'Alternative l',
  cv36: 'Alternative x',
  cv37: 'Alternative y',
  cv96: 'Full width quotes',
  cv97: 'Full width ellipsis',
  cv98: 'Full width emdash',
  cv99: 'Tranditional punctuations',
  ss01: 'Break equals',
  ss02: 'Break compare and equal',
  ss03: 'Arbitrary tag',
  ss04: 'Break multi underscore',
  ss05: 'Thin escape backslash',
  ss06: 'Break connected strokes',
  ss07: 'Relax multi-greaters condition',
  ss08: 'Double / back rows',
  cv05: 'Alternative g',
  cv06: 'Alternative i',
  cv07: 'Alternative J',
  cv08: 'Alternative r',
  cv38: 'Alternative g',
  cv39: 'Alternative i',
  cv40: 'Alternative J',
  cv41: 'Alternative r',
  cv61: 'Alternative comma',
  cv62: 'Alternative question',
  cv63: 'Alternative left arrow',
  ss09: 'Alternative not equal',
  ss10: 'Approximately equal',
  ss11: 'Extra equal ligatures',
}

const en = {
  description,
  uiString: {
    fontStyle: {
      title: 'Font Style',
      regular: 'Regular',
      italic: 'Italic',
    },
    fontSize: 'Font Size',
    fontWeight: 'Font Weight',
    loading: 'Loading...',
    loadCN: 'Load Chinese Font',
    title: {
      basic: 'Basic Ligatures',
      cv: 'Character Variants',
      italic: 'Italic Only',
      cn: 'CN Only',
      issue: 'Known Issue',
      ss: 'Stylistic sets',
    },
  },
}

export default en

export type PlaygroundTranslation = typeof en
