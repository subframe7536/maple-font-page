import type { PolymorphicProps } from '@kobalte/core'
import type { JSX, ValidComponent } from 'solid-js'

import * as SwitchPrimitive from '@kobalte/core/switch'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

const Switch = SwitchPrimitive.Root
const SwitchDescription = SwitchPrimitive.Description
const SwitchErrorMessage = SwitchPrimitive.ErrorMessage

type SwitchControlProps = SwitchPrimitive.SwitchControlProps & {
  class?: string | undefined
  children?: JSX.Element
}

function SwitchControl<T extends ValidComponent = 'input'>(props: PolymorphicProps<T, SwitchControlProps>) {
  const [local, others] = splitProps(props as SwitchControlProps, ['class'])
  return (
    <>
      <SwitchPrimitive.Input class="peer" />
      <SwitchPrimitive.Control
        class={cls(
          'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full b-(2 #0000) bg-input transition data-[checked]:bg-primary data-[disabled]:effect-dis peer-focus-visible:effect-fv',
          local.class,
        )}
        {...others}
      />
    </>
  )
}

type SwitchThumbProps = SwitchPrimitive.SwitchThumbProps & { class?: string | undefined }

function SwitchThumb<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, SwitchThumbProps>) {
  const [local, others] = splitProps(props as SwitchThumbProps, ['class'])
  return (
    <SwitchPrimitive.Thumb
      class={cls(
        'pointer-events-none block size-5 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-5',
        local.class,
      )}
      {...others}
    />
  )
}

type SwitchLabelProps = SwitchPrimitive.SwitchLabelProps & { class?: string | undefined }

function SwitchLabel<T extends ValidComponent = 'label'>(props: PolymorphicProps<T, SwitchLabelProps>) {
  const [local, others] = splitProps(props as SwitchLabelProps, ['class'])
  return (
    <SwitchPrimitive.Label
      class={cls(
        'text-sm font-500 leading-none data-[disabled]:effect-dis',
        local.class,
      )}
      {...others}
    />
  )
}

export { Switch, SwitchControl, SwitchDescription, SwitchErrorMessage, SwitchLabel, SwitchThumb }
