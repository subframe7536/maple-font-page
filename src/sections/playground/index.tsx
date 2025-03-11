import { onMount } from 'solid-js'

import { loadMapleMono } from '../../cdn'

export interface FontFeatureItem {
  title: string
  data: [text: string, feat: string][]
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
