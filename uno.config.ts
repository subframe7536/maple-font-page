import type { Preset, PresetWind3Theme } from 'unocss'

import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetInView } from 'unocss-preset-inview'

import { featureArray } from './data/features/features'
import { cdnPrefix } from './src/utils/constant'

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

const fallbackFamily = [
  'ui-monospace',
  'Monaco',
  'DejaVu Sans Mono',
  'Lucida Console',
  'Consolas',
  'monospace',
  'Noto Sans CJK SC', /* Google Noto Sans - Excellent Simplified Chinese coverage */
  'Noto Sans CJK TC', /* Google Noto Sans - Excellent Traditional Chinese coverage */

  /* 2. Mobile System Fonts (Prioritized for mobile OS defaults) */
  'PingFang SC', /* iOS - Simplified Chinese (Modern, very common on iOS in China) */
  'PingFang TC', /* iOS - Traditional Chinese (Modern, very common on iOS in Taiwan/HK) */
  'Heiti SC', /* iOS/macOS - Simplified Chinese (System default & good on mobile) */
  'STHeiti', /* iOS/macOS - Simplified Chinese (older but still present) */
  'Heiti TC', /* iOS/macOS - Traditional Chinese (System default & good on mobile) */
  'STHeitiTC', /* iOS/macOS - Traditional Chinese (older but still present) */
  'Source Han Sans SC', /* Android/Cross-platform - Excellent open-source, good mobile rendering */
  'Source Han Sans TC', /* Android/Cross-platform - Excellent open-source, good mobile rendering */
  'Droid Sans Fallback', /* Android - Older Android default, still decent fallback */
  'sans-serif-cjk', /* Android - Generic CJK sans-serif (may work as a broad fallback) */

  /* 3. Desktop System Fonts (Fallback for desktop environments - Windows primarily) */
  'Microsoft YaHei', /* Windows - Simplified Chinese (Common desktop font) */
  '微软雅黑', /* Windows - Simplified Chinese (Localized name) */
  'Microsoft JhengHei', /* Windows - Traditional Chinese (Good desktop choice) */
  '微軟正黑體', /* Windows - Traditional Chinese (Localized name) */

  /* 4. Generic Fallback (Always include at the very end) */
  'sans-serif',
].join(',')

const presetMaple: Preset<PresetWind3Theme> = {
  name: 'maple',
  rules: [
    [
      'font-liga',
      {
        '-webkit-font-feature-settings': 'var(--feat)',
        'font-feature-settings': 'var(--feat)',
        'font-variation-settings': '"wght" var(--fw)',
        'font-family': `var(--ff), ${fallbackFamily} !important`,
        '--feat': featureArray.map(fea => `"${fea}" var(--feat-${fea}, ${fea === 'calt' ? 1 : 0})`).join(', '),
      },
    ],
    ['font-cn', { 'font-family': 'MapleMono, Maple Mono CN, Maple Mono NF CN !important' }],
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

export default defineConfig<PresetWind3Theme>({
  presets: [
    presetWind3({
      preflight: 'on-demand',
    }),
    presetAnimations(),
    presetMaple,
    presetIcons({
      scale: 1.2,
    }),
    presetTypography({
      cssExtend: ({ colors }) => {
        const { primary, secondary, note, accent } = colors || {}
        return {
          'h1, h2, h3, h4, h5, h6': {
            color: accessDefault(secondary),
            position: 'relative',
          },
          'strong, em': {
            color: accessDefault(primary),
          },
          'b, strong': {
            'font-style': 'normal !important',
            '--fw': 650,
          },
          'a': {
            color: accessDefault(accent),
          },
          'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
            'width': '100%',
            'display': 'inline-block',
            'color': 'unset',
            'text-decoration': 'unset',
          },
          'h1 a:hover, h2 a:hover, h3 a:hover, h4 a:hover, h5 a:hover, h6 a:hover': {
            'text-decoration': 'underline',
          },
          'code': {
            'color': '#edabab',
            'border': `2px solid ${note}`,
            'border-radius': '6px',
            'padding': '2px 4px',
          },
          'code::after, code::before': {
            content: 'none',
          },
          'pre': {
            'border-radius': '.5rem',
            'line-height': 1.5,
            'max-height': '490px',
            'overflow-y': 'scroll',
          },
          'pre>code': {
            border: '0',
            padding: '0',
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
        DEFAULT: 'hsl(140 28% 72%)',
        alt: 'hsl(140 16% 64%)',
        foreground: 'hsl(140 40% 20%)',
      },
      muted: {
        DEFAULT: 'hsl(202 20% 30%)',
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
  extractors: [
    {
      name: 'extract-icons',
      extract({ extracted }) {
        const arr = []
        for (const item of extracted) {
          if (item.startsWith('lucide')) {
            extracted.delete(item)
            arr.push(`i-${item}`)
          }
        }
        return arr.length ? arr : undefined
      },
    },
  ],
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
    transformerDirectives(),
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

          ::-webkit-scrollbar-corner {
            background: transparent;
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
