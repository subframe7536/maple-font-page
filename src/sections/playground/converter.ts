import defaultConfig from '@data/features/config.json'

export type FeatureValue = '0' | '1'

export type FeatureState = Record<string, FeatureValue>

export function toStyleObject(features: FeatureState) {
  return Object.fromEntries(
    Object.entries(features)
      .filter(([, v]) => v === '1')
      .map(([k, v]) => [`--feat-${k}`, v]),
  )
}

export function toConfigJson(features: FeatureState) {
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

  return hasChanged
    ? JSON.stringify(result, null, 2)
    : undefined
}
export function toCliFlag(features: FeatureState) {
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
  return result.length ? result.join(' ') : undefined
}
