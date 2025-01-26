import {
  defineConfig,
  type Preset,
  presetIcons,
  presetTypography,
  presetUno,
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
] as const

const presetMaple: Preset = {
  name: 'maple',
  rules: [
    [
      'font-liga',
      {
        'font-feature-settings': 'var(--liga)',
        'font-family': 'var(--ff)',
      },
    ],
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
        // font size: https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjM3NXB4IiwibWF4V2lkdGgiOiIzODQwcHgiLCJtaW5Gb250U2l6ZSI6IjE2cHgiLCJtYXhGb250U2l6ZSI6IjI0cHgifQ%3D%3D
        return `
          html {
            font-size: clamp(1rem, 0.9459rem + 0.2309vw, 1.5rem);
            --ff: MapleMono, monospace;
          }
          body {
            --liga: ${features.map(fea => `"${fea}" var(--ffs-${fea}, ${fea === 'calt' ? 1 : 0})`).join(', ')};
          }
          ${fontface()}
          ${fontface(true)}
        `
      },
    },
  ],
}

const radius = '0.5rem'

export default defineConfig({
  presets: [
    presetUno({
      preflight: 'on-demand',
    }),
    presetMaple,
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
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
    ['hero-gradient', 'from-#C8E2C6 to-#6F9AF8 bg-(gradient-to-r clip-text)'],
    [/^x-(\w+)?[-:](.*)$/, ([, name, style]) => `[&_.x-${name ?? ''}]:${style}`],
  ],
  theme: {
    colors: {
      border: 'hsl(212 80% 60%)',
      input: 'hsl(212 80% 60%)',
      background: 'hsl(212 30% 22%)',
      ring: 'hsl(213 27% 84%)',
      foreground: 'hsl(197 50% 90%)',
      primary: {
        DEFAULT: 'hsl(197 50% 76%)',
        foreground: 'hsl(197 47% 12%)',
      },
      secondary: {
        DEFAULT: 'hsl(140 32% 80%)',
        foreground: 'hsl(140 40% 20%)',
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
        return `
          ::selection {
            background-color: ${theme.colors.foreground};
            color: ${theme.colors.background};
          }
        `
      },
    },
  ],
})
