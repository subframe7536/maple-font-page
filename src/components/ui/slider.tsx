import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { JSX, ValidComponent } from 'solid-js'

import * as SliderPrimitive from '@kobalte/core/slider'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

import { Label } from './label'

type SliderRootProps<T extends ValidComponent = 'div'> = SliderPrimitive.SliderRootProps<T> & {
  class?: string | undefined
}

function Slider<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, SliderRootProps<T>>) {
  const [local, others] = splitProps(props as SliderRootProps, ['class'])
  return (
    <SliderPrimitive.Root
      class={cls('relative flex w-full touch-none select-none flex-col items-center', local.class)}
      {...others}
    />
  )
}

type SliderTrackProps<T extends ValidComponent = 'div'> = SliderPrimitive.SliderTrackProps<T> & {
  class?: string | undefined
}

function SliderTrack<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, SliderTrackProps<T>>) {
  const [local, others] = splitProps(props as SliderTrackProps, ['class'])
  return (
    <SliderPrimitive.Track
      class={cls('relative h-2 w-full grow rounded-full bg-primary/50', local.class)}
      {...others}
    />
  )
}

type SliderFillProps<T extends ValidComponent = 'div'> = SliderPrimitive.SliderFillProps<T> & {
  class?: string | undefined
}

function SliderFill<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, SliderFillProps<T>>) {
  const [local, others] = splitProps(props as SliderFillProps, ['class'])
  return (
    <SliderPrimitive.Fill
      class={cls('absolute h-full rounded-full bg-primary', local.class)}
      {...others}
    />
  )
}

type SliderThumbProps<T extends ValidComponent = 'span'> = SliderPrimitive.SliderThumbProps<T> & {
  class?: string | undefined
  children?: JSX.Element
}

function SliderThumb<T extends ValidComponent = 'span'>(props: PolymorphicProps<T, SliderThumbProps<T>>) {
  const [local, others] = splitProps(props as SliderThumbProps, ['class', 'children'])
  return (
    <SliderPrimitive.Thumb
      class={cls(
        'top--6px block size-5 rounded-full b-(2 secondary) bg-background transition-colors focus-visible:effect-fv disabled:effect-dis',
        local.class,
      )}
      {...others}
    >
      <SliderPrimitive.Input />
    </SliderPrimitive.Thumb>
  )
}

function SliderLabel<T extends ValidComponent = 'label'>(props: PolymorphicProps<T, SliderPrimitive.SliderLabelProps<T>>) {
  return <SliderPrimitive.Label as={Label} {...props} />
}

function SliderValueLabel<T extends ValidComponent = 'label'>(props: PolymorphicProps<T, SliderPrimitive.SliderValueLabelProps<T>>) {
  return <SliderPrimitive.ValueLabel as={Label} {...props} />
}

export { Slider, SliderFill, SliderLabel, SliderThumb, SliderTrack, SliderValueLabel }
