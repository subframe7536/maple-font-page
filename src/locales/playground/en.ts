import type { FeatureDescription } from '@data/features/features'

const description: FeatureDescription = {
  calt: 'Default ligatures',
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
  fontStyle: {
    title: 'Font Style',
    regular: 'Regular',
    italic: 'Italic',
  },
  fontSize: 'Font Size',
  fontWeight: 'Font Weight',
  loading: 'Loading...',
  loadCN: 'Load Chinese Font',
  sectionTitle: {
    basic: 'Basic Ligatures',
    cv: 'Character Variants',
    italic: 'Italic Only',
    cn: 'CN Only',
    issue: 'Known Issue',
    ss: 'Stylistic sets',
  },
  action: {
    guide: {
      text: 'Guide to custom build',
      link: 'https://github.com/subframe7536/maple-font?tab=readme-ov-file#custom-build',
    },
    config: {
      btnText: 'Generate Config',
      title: 'Configuration of Custom Build',
      description: 'Custom build is used to build your own font. It can change font metadata (e.g. family name), modify OpenType Features and so on at build time. ',
      noNeed: 'Nothing changed, no need to setup',
      cliFlags: 'CLI Flags',
      extra: {
        nf: 'Bundle Nerd-Font Icons',
        cn: 'Bundle CN / JP Glyphs',
        hinted: 'Use Hinted Base Font',
        normal: 'Use Normal Preset',
      },
    },
    build: {
      btnText: 'Build In Browser',
      title: 'Custom Build Font In Browser',
      download: 'Build and Download',
      unsupported: 'Custom build is not supported in legacy browser, please upgrade your browser or choose another way. ',
      tab: {
        download: 'Download From GitHub',
        upload: 'Upload Zip File',
      },
      options: {
        formatTitle: 'Font Format and Glyph set',
        hintTitle: 'Font Hint',
        useHinted: 'Use Hinted Font as Base Font',
        proxyURL: 'CORS Proxy URL',
        proxyURLPlaceholder: 'Enter GitHub Proxy URL to Fix CORS Error',
        finalURL: 'Final Download URL',
      },
      file: {
        download: {
          title: 'Download Font ZIP',
          descStart: 'Download font ZIP in',
          descEnd: '',
          text: 'Get Font Page',
        },
        upload: {
          title: 'Upload ZIP File',
          btn: 'Drop or select ZIP file',
          alert: 'Please validate the ZIP file yourself before upload!',
        },
      },
      chooseGuide: {
        text: 'Options Explain',
        link: 'https://github.com/subframe7536/maple-font?tab=readme-ov-file#naming-faq',
      },
      log: 'Log Output',
    },
  },
}

export default en

export type PlaygroundTranslation = typeof en
