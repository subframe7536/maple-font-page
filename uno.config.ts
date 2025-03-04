import type { Preset, PresetUnoTheme } from 'unocss'

import {
  defineConfig,
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

const fallbackFamily = 'ui-monospace, Monaco, "DejaVu Sans Mono", "Lucida Console", Consolas, monospace'

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
          `url('${fontPrefix}/MapleMono${isItalic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2-variations')`,
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
          html {
            --ff: MapleMono;
            font-family: var(--ff), ${fallbackFamily};
          }
          body {
            --liga: ${features.map(fea => `"${fea}" var(--fea-${fea}, ${fea === 'calt' ? 1 : 0})`).join(', ')};
          }
          ${fontface()}
          ${fontface(true)}
        `
      },
    },
  ],
}

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) {
    t += 1
  }
  if (t > 1) {
    t -= 1
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t
  }
  if (t < 1 / 2) {
    return q
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  }
  return p
}

function hslToRgb(hslString: string): string {
  if (!hslString.startsWith('hsl(') || !hslString.endsWith(')')) {
    return hslString
  }
  let [h, s, l] = hslString
    .slice(4, -1)
    .split(' ')
    .map(str => str.endsWith('%') ? Number(str.slice(0, -1)) / 100 : Number(str) / 360)

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`
}

const radius = '0.5rem'

function accessDefault(themeColor: string | { DEFAULT?: string }): string {
  if (typeof themeColor === 'string') {
    return themeColor
  }
  return themeColor.DEFAULT || 'none'
}

export default defineConfig<PresetUnoTheme>({
  presets: [
    presetUno({
      preflight: 'on-demand',
    }),
    presetMaple,
    presetIcons({
      scale: 1.2,
    }),
    presetTypography({
      cssExtend: ({ colors }) => {
        const { primary } = colors || {}
        return {
          'strong, em': {
            color: accessDefault(primary),
          },
        }
      },
    }),
    presetInView(),
  ],
  shortcuts: [
    ['effect-fv', 'outline-none ring-1.5 ring-ring ring-offset-(2 background)'],
    ['effect-dis', 'pointer-events-none opacity-50 cursor-not-allowed'],
    ['animated-underline', 'relative decoration-none before:(content-empty bg-secondary absolute transition-all-200 transform-origin-right rounded bottom-4px h-2px w-0 right-8px) hover:before:(transform-origin-left left-8px w-[calc(100%-16px)])'],
    ['hero-gradient', 'supports-[(background-clip:text)]:(from-#C8E2C6 to-#6F9AF8 bg-(gradient-to-r clip-text) !c-transparent)'],
    [/^x-(\w+)?[-:](.*)$/, ([, name, style]) => `[&_.x-${name ?? ''}]:${style}`],
  ],
  theme: {
    colors: {
      border: 'hsl(212 64% 80%)',
      input: 'hsl(212 80% 60%)',
      background: 'hsl(212 30% 22%)',
      ring: 'hsl(212 27% 84%)',
      foreground: 'hsl(202 50% 90%)',
      primary: {
        DEFAULT: 'hsl(202 64% 80%)',
        foreground: 'hsl(202 47% 12%)',
      },
      secondary: {
        DEFAULT: 'hsl(140 32% 80%)',
        foreground: 'hsl(140 40% 20%)',
      },
      muted: {
        DEFAULT: 'hsl(202 33% 18%)',
        foreground: 'hsl(202 20% 65%)',
      },
      accent: {
        DEFAULT: 'hsl(32 90% 85%)',
        foreground: 'hsl(202 33% 18%)',
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
  extendTheme: (theme) => {
    theme.breakpoints!.xs = '425px'
    for (const [key, val] of Object.entries(theme.colors!)) {
      if (typeof val === 'string') {
        theme.colors![key] = hslToRgb(val)
      }
      if (typeof val === 'object' && val.DEFAULT?.startsWith('hsl')) {
        for (const [k, v] of Object.entries(val)) {
          // @ts-expect-error fxxk
          theme.colors![key][k] = hslToRgb(v)
        }
      }
    }
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
