import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionTriggerProps,
} from '@kobalte/core/accordion'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { ParentProps, ValidComponent } from 'solid-js'

import * as AccordionPrimitive from '@kobalte/core/accordion'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

import Icon from '../icon'

export const Accordion = AccordionPrimitive.Root

type accordionItemProps<T extends ValidComponent = 'div'> =
  AccordionItemProps<T> & {
    class?: string
  }

export function AccordionItem<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, accordionItemProps<T>>) {
  const [local, rest] = splitProps(props as accordionItemProps, ['class'])

  return (
    <AccordionPrimitive.Item class={cls('b-(b border)', local.class)} {...rest} />
  )
}

type accordionTriggerProps<T extends ValidComponent = 'button'> = ParentProps<
  AccordionTriggerProps<T> & {
    class?: string
  }
>

export function AccordionTrigger<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, accordionTriggerProps<T>>) {
  const [local, rest] = splitProps(props as accordionTriggerProps, [
    'class',
    'children',
  ])

  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cls(
          'flex flex-1 items-center justify-between py-4 font-500 transition-shadow hover:underline bg-inherit focus-visible:effect-fv',
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <Icon name="lucide:chevron-left" class="transition [[data-expanded]_&]-rotate--90" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type accordionContentProps<T extends ValidComponent = 'div'> = ParentProps<
  AccordionContentProps<T> & {
    class?: string
  }
>

export function AccordionContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, accordionContentProps<T>>) {
  const [local, rest] = splitProps(props as accordionContentProps, [
    'class',
    'children',
  ])

  return (
    <AccordionPrimitive.Content
      class={cls(
        'animate-accordion-up of-hidden data-[expanded]:animate-accordion-down',
        local.class,
      )}
      {...rest}
    >
      <div class="p-(b-4 t-0)">{local.children}</div>
    </AccordionPrimitive.Content>
  )
}
