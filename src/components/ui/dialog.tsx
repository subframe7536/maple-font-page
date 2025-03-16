import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogTitleProps,
} from '@kobalte/core/dialog'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { ComponentProps, ParentProps, ValidComponent } from 'solid-js'

import { Dialog as DialogPrimitive } from '@kobalte/core/dialog'
import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

export const Dialog = DialogPrimitive
export const DialogTrigger = DialogPrimitive.Trigger

type dialogContentProps<T extends ValidComponent = 'div'> = ParentProps<
  DialogContentProps<T> & {
    class?: string
  }
>

export function DialogContent<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, dialogContentProps<T>>) {
  const [local, rest] = splitProps(props as dialogContentProps, [
    'class',
    'children',
  ])

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        class={cls(
          'fixed inset-0 z-50 bg-background/80 data-[expanded]:(animate-in fade-in-0) data-[closed]:(animate-out fade-out-0)',
        )}
        {...rest}
      />
      <DialogPrimitive.Content
        class={cls(
          'fixed left-50% top-50% z-50 grid w-full max-w-lg translate--50% gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48% duration-200) data-[closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-48% duration-200) md:w-full sm:rounded-lg',
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <DialogPrimitive.CloseButton class="disabled:effect-dis absolute right-4 top-4 rounded-sm bg-inherit opacity-70 focus:effect-fv ring-offset-background transition transition-opacity hover:opacity-100">
          <div class="i-lucide-x" />
          <div class="sr-only">Close</div>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

type dialogTitleProps<T extends ValidComponent = 'h2'> = DialogTitleProps<T> & {
  class?: string
}

export function DialogTitle<T extends ValidComponent = 'h2'>(props: PolymorphicProps<T, dialogTitleProps<T>>) {
  const [local, rest] = splitProps(props as dialogTitleProps, ['class'])

  return (
    <DialogPrimitive.Title
      class={cls('text-lg font-semibold text-foreground', local.class)}
      {...rest}
    />
  )
}

type dialogDescriptionProps<T extends ValidComponent = 'p'> =
  DialogDescriptionProps<T> & {
    class?: string
  }

export function DialogDescription<T extends ValidComponent = 'p'>(props: PolymorphicProps<T, dialogDescriptionProps<T>>) {
  const [local, rest] = splitProps(props as dialogDescriptionProps, ['class'])

  return (
    <DialogPrimitive.Description
      class={cls('text-sm text-muted-foreground', local.class)}
      {...rest}
    />
  )
}

export function DialogHeader(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cls(
        'flex flex-col space-y-2 text-center sm:text-left',
        local.class,
      )}
      {...rest}
    />
  )
}

export function DialogFooter(props: ComponentProps<'div'>) {
  const [local, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cls(
        'flex flex-col-reverse sm:(flex-row justify-end space-x-2)',
        local.class,
      )}
      {...rest}
    />
  )
}
