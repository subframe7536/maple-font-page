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

const slantColor = {
  'background': '222.2 84% 4.9%',
  'foreground': '210 40% 98%',
  'card': '222.2 84% 4.9%',
  'card-foreground': '210 40% 98%',
  'popover': '222.2 84% 4.9%',
  'popover-foreground': '210 40% 98%',
  'primary': '210 40% 98%',
  'primary-foreground': '222.2 47.4% 11.2%',
  'secondary': '217.2 32.6% 17.5%',
  'secondary-foreground': '210 40% 98%',
  'muted': '217.2 32.6% 17.5%',
  'muted-foreground': '215 20.2% 65.1%',
  'accent': '217.2 32.6% 17.5%',
  'accent-foreground': '210 40% 98%',
  'destructive': '0 62.8% 30.6%',
  'destructive-foreground': '210 40% 98%',
  'border': '217.2 32.6% 17.5%',
  'input': '217.2 32.6% 17.5%',
  'ring': '212.7 26.8% 83.9%',
}

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
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      background: 'hsl(212deg 30% 30%)',
      text: 'hsl(32deg 90% 85%)',
      ring: 'hsl(var(--ring))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      xl: 'calc(var(--radius) + 4px)',
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
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
          :root {
            --radius: 0.5rem;
            ${Object.entries(slantColor).map(([name, hsl]) => `--${name}: ${hsl}`).join(';\n')}
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
