import type { features } from '../../../uno.config'

import { onMount } from 'solid-js'

import { loadMapleMono } from '../../cdn'

export interface FontFeatureItem {
  title: string
  text: string
  feat: typeof features[Extract<keyof typeof features, number>]
  italic?: boolean
  cn?: boolean
}

export interface PlaygroundProps {
  features: FontFeatureItem[]
  /**
   * Unit: px
   */
  sizeRange: [start: number, end: number]
  weightRange: [start: number, end: number]
}

export default function Playground(props: PlaygroundProps) {
  onMount(() => {
    loadMapleMono()
  })
  return (
    <div>Maple Mono</div>
  )
}
