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

const radius = '0.5rem'

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
      border: 'hsl(212 80% 60%)',
      input: 'hsl(212 80% 60%)',
      background: 'hsl(212 30% 30%)',
      ring: 'hsl(213 27% 84%)',
      foreground: 'hsl(197 50% 90%)',
      primary: {
        DEFAULT: 'hsl(197 50% 76%)',
        foreground: 'hsl(197 47% 12%)',
      },
      secondary: {
        DEFAULT: 'hsl(215 32% 80%)',
        foreground: 'hsl(215 40% 20%)',
      },
      destructive: {
        DEFAULT: 'hsl(0 63% 30%)',
        foreground: 'hsl(210 40% 98%)',
      },
      muted: {
        DEFAULT: 'hsl(217 33% 18%)',
        foreground: 'hsl(215 20% 65%)',
      },
      accent: {
        DEFAULT: 'hsl(32 90% 85%)',
        foreground: 'hsl(217 33% 18%)',
      },
    },
    borderRadius: {
      xl: `calc(${radius} + 4px)`,
      lg: radius,
      md: `calc(${radius} - 2px)`,
      sm: `calc(${radius} - 4px)`,
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
        'accordion-down': '0.3s',
        'accordion-up': '0.3s',
      },
    },
  },
  transformers: [
    transformerVariantGroup(),
  ],
  preflights: [
    {
      getCSS: ({ theme }: { theme: any & { colors: any } }) => {
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
            background-color: ${theme.colors.foreground};
            color: ${theme.colors.background};
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
