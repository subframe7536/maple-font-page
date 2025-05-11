import defaultConfig from '@data/features/config.json'
import { normalFeatureArray } from '@data/features/features'

export type FeatureValue = '0' | '1'

export type FeatureState = Record<string, FeatureValue>

export type ExtraConfigKey = 'nf' | 'cn' | 'hinted' | 'normal'
export type ExtraConfig = Record<ExtraConfigKey, boolean>

export function toStyleObject(features: FeatureState) {
  return Object.fromEntries(
    Object.entries(features)
      .filter(([, v]) => v === '1')
      .map(([k, v]) => [`--feat-${k}`, v]),
  )
}

export function toConfigJson(features: FeatureState, extra: ExtraConfig) {
  let hasChanged = false
  const result = defaultConfig
  for (const [k, v] of Object.entries(features)) {
    if (k === 'calt' && v === '0') {
      result.ligature = false
      hasChanged = true
    } else if (k !== 'calt' && v === '1') {
      result.feature_freeze[k as keyof typeof result.feature_freeze] = 'enable'
      hasChanged = true
    }
  }

  if (!extra.nf) {
    result.nerd_font.enable = false
    hasChanged = true
  }
  if (extra.cn) {
    result.cn.enable = hasChanged = true
  }
  if (!extra.hinted) {
    result.use_hinted = false
    hasChanged = true
  }
  if (extra.normal) {
    for (const key of normalFeatureArray) {
      result.feature_freeze[key as keyof typeof result.feature_freeze] = 'enable'
    }
    hasChanged = true
  }

  return hasChanged
    ? JSON.stringify(result, null, 2)
    : undefined
}
export function toCliFlag(features: FeatureState, extra: ExtraConfig) {
  const feat = Object.entries(features)
    .filter(([k, v]) => v === '1' && !k.includes('calt'))
    .map(([k]) => k)

  let result = []
  if (features.calt === '0') {
    result.push('--no-liga')
  }
  if (feat.length) {
    result.push(`--feat ${feat}`)
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

  return result.length ? result.join(' ') : undefined
}
