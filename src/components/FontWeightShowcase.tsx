import { createSignal } from 'solid-js'

import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from './ui/slider'

export default function FontWeightShowcase() {
  const [fontWeight, setFontWeight] = createSignal(400)

  return (
    <div class="w-80% flex flex-col items-center">
      <Slider
        minValue={200}
        maxValue={800}
        value={[fontWeight()]}
        onChange={([val]) => setFontWeight(val)}
        class="w-full space-y-2"
      >
        <div class="w-full flex justify-between">
          <SliderLabel>Weight</SliderLabel>
          <SliderValueLabel>{fontWeight()}</SliderValueLabel>
        </div>
        <SliderTrack>
          <SliderFill />
          <SliderThumb />
        </SliderTrack>
      </Slider>
      <div
        class="mt-4 text-6xl"
        style={{ 'font-weight': fontWeight() }}
      >
        Showcase Font
      </div>
    </div>
  )
}
