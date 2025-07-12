import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type {
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps,
} from '@kobalte/core/tabs'
import type { ValidComponent, VoidProps } from 'solid-js'

import * as TabsPrimitive from '@kobalte/core/tabs'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

type tabsProps<T extends ValidComponent = 'div'> = TabsRootProps<T> & {
  class?: string
}

export function Tabs<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, tabsProps<T>>) {
  const [local, rest] = splitProps(props as tabsProps, ['class'])

  return (
    <TabsPrimitive.Root
      class={cls('w-full data-[orientation=vertical]:flex', local.class)}
      {...rest}
    />
  )
}

type tabsListProps<T extends ValidComponent = 'div'> = TabsListProps<T> & {
  class?: string
}

export function TabsList<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, tabsListProps<T>>) {
  const [local, rest] = splitProps(props as tabsListProps, ['class'])

  return (
    <TabsPrimitive.List
      class={cls(
        'relative flex rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:(flex-col items-stretch) data-[orientation=horizontal]:items-center',
        local.class,
      )}
      {...rest}
    />
  )
}

type tabsContentProps<T extends ValidComponent = 'div'> =
  TabsContentProps<T> & {
    class?: string
  }

export function TabsContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, tabsContentProps<T>>) {
  const [local, rest] = splitProps(props as tabsContentProps, ['class'])

  return (
    <TabsPrimitive.Content
      class={cls(
        'data-[orientation=vertical]:ml-2 data-[orientation=horizontal]:mt-2 transition-shadow duration-200 focus-visible:effect-fv',
        local.class,
      )}
      {...rest}
    />
  )
}

type tabsTriggerProps<T extends ValidComponent = 'button'> =
  TabsTriggerProps<T> & {
    class?: string
  }

export function TabsTrigger<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, tabsTriggerProps<T>>) {
  const [local, rest] = splitProps(props as tabsTriggerProps, ['class'])

  return (
    <TabsPrimitive.Trigger
      class={cls(
        'min-w-12 w-full relative z-10 whitespace-nowrap of-x-hidden text-ellipsis rounded-md px-3 py-1 text-sm transition-colors disabled:effect-dis data-[selected]:(text-foreground font-600) peer h-7 outline-none',
        local.class,
      )}
      {...rest}
    />
  )
}

type tabsIndicatorProps<T extends ValidComponent = 'div'> = VoidProps<
  TabsIndicatorProps<T> & {
    class?: string
  }
>

export function TabsIndicator<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, tabsIndicatorProps<T>>) {
  const [local, rest] = splitProps(props as tabsIndicatorProps, [
    'class',
  ])

  return (
    <TabsPrimitive.Indicator
      class={cls('absolute transition-all duration-200 outline-none data-[orientation=horizontal]:(bottom-1 left-0 h-[calc(100%-0.5rem)]) data-[orientation=vertical]:(right-1 top-0 w-[calc(100%-0.5rem)]) bg-background shadow rounded-md peer-focus-visible:(ring-(1.5 ring offset-(2 background)) outline-none)', local.class)}
      {...rest}
    />
  )
}
