import type { CheckboxControlProps } from '@kobalte/core/checkbox'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { ValidComponent, VoidProps } from 'solid-js'

import { Checkbox as CheckboxPrimitive } from '@kobalte/core/checkbox'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

import Icon from '../icon'

export const CheckboxLabel = CheckboxPrimitive.Label
export const Checkbox = CheckboxPrimitive
export const CheckboxErrorMessage = CheckboxPrimitive.ErrorMessage
export const CheckboxDescription = CheckboxPrimitive.Description

type checkboxControlProps<T extends ValidComponent = 'div'> = VoidProps<
  CheckboxControlProps<T> & { class?: string }
>

export function CheckboxControl<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, checkboxControlProps<T>>) {
  const [local, rest] = splitProps(props as checkboxControlProps, [
    'class',
    'children',
  ])

  return (
    <>
      <CheckboxPrimitive.Input class="[&:focus-visible+div]:(outline-none ring-1.5 ring-offset-2 ring-ring ring-offset-background)" />
      <CheckboxPrimitive.Control
        class={cls(
          'h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:(outline-none ring-1.5 ring-ring) data-[disabled]:(cursor-not-allowed opacity-50) data-[checked]:(bg-primary text-primary-foreground) transition-shadow',
          local.class,
        )}
        {...rest}
      >
        <CheckboxPrimitive.Indicator class="flex items-center justify-center text-current">
          <Icon name="lucide:check" class="size-4" />
          <title>Checkbox</title>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
    </>
  )
}
