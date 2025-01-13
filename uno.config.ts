import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from 'unocss'
import { presetInView } from 'unocss-preset-inview'
import { myGhCdnPrefix } from './src/cdn'

const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'
const fontPrefix = isDEV ? `/fonts` : `${myGhCdnPrefix}/maple-font@variable/woff2/var`
const features = [
  'calt',
  'zero',
  'cv01',
  'cv02',
  'cv03',
  'cv04',
  'cv31',
  'cv32',
  'cv33',
  'cv34',
  'cv35',
  'cv36',
  'cv96',
  'cv97',
  'cv98',
  'cv99',
  'ss01',
  'ss02',
  'ss03',
  'ss04',
  'ss05',
  'ss06',
  'ss07',
  'ss08',
]

export default defineConfig({
  presets: [
    presetUno({
      preflight: 'on-demand',
    }),
    presetIcons({
      scale: 1.2,
    }),
    // presetWebFonts({
    //   provider: 'fontsource',
    //   fonts: {
    //     maple: 'MapleMono, Monaco, "DejaVu Sans Mono", "Lucida Console", consolas, monospace',
    //   },
    // }),
    presetInView(),
  ],
  shortcuts: [
    ['fv-effect', 'focus-visible:(outline-none ring-1.5 ring)'],
    ['flex-center', 'flex items-center justify-between'],
    [/^x-(\w+)?[-:](.*)$/, ([, name, style]) => `[&_.x-${name ?? ''}]:${style}`],
  ],
  rules: [
    ['liga', { 'font-feature-settings': 'var(--liga)' }],
  ],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('inview:')) {
        return matcher
      }
      return {
        matcher: matcher.slice(7),
        selector: s => `${s}:not([no-inview])`,
      }
    },
  ],
  theme: {
    colors: {
      primary: '#3eaf7c',
    },
    fontFamily: {
      maple: 'MapleMono, monospace',
    },
    animation: {
      keyframes: {
        'accordion-down': '{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }',
        'accordion-up': '{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }',
      },
      timingFns: {
        'accordion-down': 'ease-in-out',
        'accordion-up': 'ease-in-out',
      },
      durations: {
        'accordion-down': '0.2s',
        'accordion-up': '0.2s',
      },
    },
  },
  transformers: [
    transformerVariantGroup(),
  ],
  preflights: [
    {
      getCSS: () => {
        const getSrc = (isItalic?: boolean) => [
          `url('${fontPrefix}/MapleMono${isItalic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2')`,
          'local("Maple Mono")',
          'local("Maple Mono NF")',
          'local("Maple Mono NF CN")',
        ].join(',')

        const fontface = (isItalic?: boolean) => `
          @font-face {
            font-family: MapleMono;
            font-display: swap;
            src: ${getSrc(isItalic)};
            font-style: ${isItalic ? 'italic' : 'normal'};
          }
        `
        return `
          ::selection {
            background-color: #2a3447;
            color: #aaaaaa;
          }
          .font-maple {
            font-feature-settings: ${features.map(fea => `"${fea}" var(--ffs-${fea})`).join(', ')};
          }
          ${fontface()}
          ${fontface(true)}
        `
      },
    },
  ],
})
