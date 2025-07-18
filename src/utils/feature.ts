import defaultConfig from '@data/config.json'
import { normalFeatureArray } from '@data/features/features'

import { tag } from '@/utils/constant'

export type FeatureValue = '0' | '1'

export type FeatureState = Record<string, FeatureValue>

export type ExtraConfigKey = 'nf' | 'cn' | 'hinted' | 'normal'
export type ExtraConfig = Record<ExtraConfigKey, boolean>

export function getDefaultLigaSwitchValue(feat: string, normal?: boolean) {
  return (feat === 'calt' || (normal && normalFeatureArray.includes(feat))) ? '1' : '0'
}

export function toStyleObject(features: FeatureState, normal?: boolean) {
  return Object.fromEntries(
    Object.entries({
      ...features,
      ...normal ? Object.fromEntries(normalFeatureArray.map(k => [k, '1'])) : {},
    })
      .map(([k, v]) => [`--feat-${k}`, v]),
  )
}

export function toConfigJson(features: FeatureState, extra: ExtraConfig) {
  const result = { ...defaultConfig }
  for (const [k, v] of Object.entries(features)) {
    if (k === 'calt' && v === '0') {
      result.enable_ligature = false
    } else if (
      (k !== 'calt' && v === '1')
      || (extra.normal && normalFeatureArray.includes(k))
    ) {
      result.feature_freeze[k as keyof typeof result.feature_freeze] = 'enable'
    } else if (k !== 'calt') {
      result.feature_freeze[k as keyof typeof result.feature_freeze] = 'ignore'
    }
  }

  result.nerd_font.enable = extra.nf
  result.cn.enable = extra.cn
  result.use_hinted = extra.hinted

  return JSON.stringify(result, null, 2)
}
export function toCliFlag(features: FeatureState, extra: ExtraConfig) {
  let result = []
  if (features.calt === '0') {
    result.push('--no-liga')
  }
  if (!extra.nf) {
    result.push('--no-nerd-font')
  }
  if (extra.cn) {
    result.push('--cn')
  }
  if (!extra.hinted) {
    result.push('--no-hinted')
  }
  if (extra.normal) {
    result.push('--normal')
  }

  const feat = Object.entries(features)
    .filter(
      ([k, v]) => (v === '1'
        && !k.includes('calt')
        && (extra.normal ? !normalFeatureArray.includes(k) : true)),
    )
    .map(([k]) => k)

  if (feat.length) {
    result.push(`--feat ${feat}`)
  }

  return result.length ? result.join(' ') : undefined
}

/**
 * check `new Worker(url, { type: 'module' })` support
 *
 * {@link https://stackoverflow.com/questions/62954570/javascript-feature-detect-module-support-for-web-workers Reference}
 */
export function checkModuleWorkerSupport(): boolean {
  let supports = false
  try {
    new Worker('data:,', {
      // @ts-expect-error check assign
      get type() {
        supports = true
      },
    }).terminate()
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return supports
  }
}

export const FILE_FORMAT = ['TTF', 'OTF', 'NF', 'CN', 'NF-CN'] as const

export type FileFormat = typeof FILE_FORMAT[number]

export function parseIdString(features: Record<string, '0' | '1'>) {
  return Object.entries(features)
    .map(([k, v]) => v === '1' ? `+${k}` : (v === '0' && k === 'calt') ? '-calt' : null)
    .filter(Boolean)
    .join('; ')
}

export function buildTargetURL({
  userInputURL,
  useHinted,
  fileFormat,
}: {
  userInputURL: string
  useHinted: boolean
  fileFormat: FileFormat
}) {
  let suffix = ''
  if (useHinted) {
    if (fileFormat === 'TTF') {
      suffix = '-AutoHint'
    }
  } else if (!fileFormat.endsWith('TF')) {
    suffix = '-unhinted'
  }
  const fileName = `MapleMono-${fileFormat}${suffix}.zip`
  return `${userInputURL || 'https://github.com'}/subframe7536/maple-font/releases/download/${tag}/${fileName}`
}
