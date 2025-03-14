import type { Preset, PresetUnoTheme } from 'unocss'

import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerVariantGroup,
} from 'unocss'
import { presetInView } from 'unocss-preset-inview'

import { cdnPrefix } from './src/utils/cdn'

export const features = [
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
  'cv37',
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

function generateBaseFontface(name: string, src: string, isItalic?: boolean) {
  return `
    @font-face {
      font-family: ${name};
      font-display: swap;
      font-weight: 400;
      src: ${src};
      font-style: ${isItalic ? 'italic' : 'normal'};
    }
  `
}

function getJetBrainsMono(isItalic: boolean) {
  const suffix = isItalic ? 'Italic' : 'Regular'
  const src = [
    `local("JetBrains Mono ${suffix}")`,
    `local("JetBrainsMono-${suffix}")`,
    `url('${cdnPrefix}/jetbrains-mono@latest/fonts/webfonts/JetBrainsMono-${suffix}.woff2') format('woff2')`,
  ].join(',')
  return generateBaseFontface('JetBrains Mono', src, isItalic)
}

function getFiraCode() {
  const src = [
    `local("Fira Code Roman Regular")`,
    `local("FiraCodeRoman")`,
    `local("Fira Code Regular")`,
    `local("FiraCode-Regular")`,
    `url('${cdnPrefix}/firacode@latest/distr/woff2/FiraCode-Regular.woff2') format('woff2')`,
  ].join(',')
  return generateBaseFontface('Fira Code', src)
}

function getIosevka(isItalic: boolean) {
  const src = [
    `local("Iosevka${isItalic ? ' Italic' : ''}")`,
  ]
  if (isItalic) {
    src.push(`local("Iosevka-Italic")`)
  }
  src.push(
    `url('${cdnPrefix}/gh/iosevka-webfonts/iosevka@main/WOFF2/Iosevka-${isItalic ? 'Italic' : 'Regular'}.woff2') format('woff2')`,
  )
  return generateBaseFontface('Iosevka', src.join(','), isItalic)
}

const fallbackFamily = 'ui-monospace, Monaco, "DejaVu Sans Mono", "Lucida Console", Consolas, monospace'

const presetMaple: Preset<PresetUnoTheme> = {
  name: 'maple',
  rules: [
    [
      'font-liga',
      {
        '-webkit-font-feature-settings': 'var(--feat)',
        'font-feature-settings': 'var(--feat)',
        'font-variation-settings': '"wght" var(--fw)',
        'font-family': `var(--ff), ${fallbackFamily} !important`,
        '--feat': features.map(fea => `"${fea}" var(--feat-${fea}, ${fea === 'calt' ? 1 : 0})`).join(', '),
      },
    ],
    ['font-bold', { '--fw': 700 }],
    [/font-(\d+)/, ([, weight]) => ({ '--fw': weight })],
  ],
  theme: {
    animation: {
      keyframes: {
        'wave-weight': `{
          from, to {
            font-variation-settings: "wght" 200
          }
          50% {
            font-variation-settings: "wght" 800
          }
        }`,
      },
      timingFns: {
        'wave-weight': 'ease-in-out',
      },
      durations: {
        'wave-weight': '2s',
      },
      counts: {
        'wave-weight': 'infinite',
      },
    },
  },
  preflights: [
    {
      getCSS: () => {
        return `
          html {
            font-family: ${fallbackFamily};
            --ff: MapleMono;
            --feat: "calt";
          }
          ${getJetBrainsMono(false)}
          ${getJetBrainsMono(true)}
          ${getFiraCode()}
          ${getIosevka(false)}
          ${getIosevka(true)}
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
          'b, strong': {
            'font-style': 'normal !important',
            '--fw': 650,
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
    [/^inview-(\d+)$/, ([, index]) => `translate-y-8 op-0 transition-500 delay-${index}00 ease-in-out inview:(translate-y-0 op-300)`],
  ],
  theme: {
    colors: {
      border: 'hsl(212 64% 80%)',
      input: 'hsl(212 36% 50%)',
      background: 'hsl(212 30% 22%)',
      ring: 'hsl(212 27% 84%)',
      foreground: 'hsl(202 50% 90%)',
      note: 'hsl(202 20% 64%)',
      primary: {
        DEFAULT: 'hsl(202 64% 80%)',
        foreground: 'hsl(202 47% 12%)',
      },
      secondary: {
        DEFAULT: 'hsl(140 32% 80%)',
        foreground: 'hsl(140 40% 20%)',
      },
      muted: {
        DEFAULT: 'hsl(202 20% 35%)',
        foreground: 'hsl(202 30% 88%)',
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
    animation: {
      keyframes: {
        'accordion-down': '{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }',
        'accordion-up': '{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }',
        'typing': '{ from { width: 0 } to { width: 10ch } }',
        'flashing': '{ from, to { opacity: 0 } 50% { opacity: 1 } }',
      },
      timingFns: {
        'accordion-down': 'ease-in-out',
        'accordion-up': 'ease-in-out',
        'typing': 'steps(10)',
        'flashing': 'ease-in',
      },
      durations: {
        'accordion-down': '0.3s',
        'accordion-up': '0.3s',
        'typing': '1s',
        'flashing': '2s',
      },
      counts: {
        flashing: 'infinite',
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
          :root {
            --scrollbar-width: max(0.85vw, 10px);
          }

          @media (prefers-color-scheme: light) {
            :root {
              --scrollbar-color-rgb: 0, 0, 0;
            }
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --scrollbar-color-rgb: 255, 255, 255;
            }
          }

          *::-webkit-scrollbar {
            width: var(--scrollbar-width) !important;
            height: var(--scrollbar-width) !important;
          }

          *::-webkit-scrollbar-track {
            background-color: transparent !important;
            border-radius: var(--scrollbar-width) !important;
            box-shadow: none !important;
          }

          *::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 0 var(--scrollbar-width) !important;
            border-radius: var(--scrollbar-width) !important;
            border: calc(var(--scrollbar-width) * 2 / 9) solid transparent !important;
            background-clip: content-box;
            background-color: transparent !important;
            color: ${theme.colors.input} !important;
          }

          *::-webkit-scrollbar-thumb:active {
            color: ${theme.colors.border} !important;
          }

          @supports not selector(::-webkit-scrollbar) {
            html {
              scrollbar-color: ${theme.colors.input};
              scrollbar-width: thin;
            }
          }
        `
      },
    },
  ],
})
