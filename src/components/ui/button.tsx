import type { ButtonRootProps } from '@kobalte/core/button'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { VariantProps } from 'cls-variant'
import type { ValidComponent } from 'solid-js'

import { Button as ButtonPrimitive } from '@kobalte/core/button'
import { cls, clsv, clsvDefault } from 'cls-variant'
import { splitProps } from 'solid-js'

export const buttonVariants = clsvDefault(
  clsv(
    'inline-flex items-center justify-center rounded-md font-500 transition focus-visible:effect-fv disabled:effect-dis select-none whitespace-nowrap',
    {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90',
        outline: 'b-(2 border) c-border bg-background shadow-sm hover:b-border/80',
        link: 'animated-underline w-fit',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
      },
    },
  ),
  {
    variant: 'default',
    size: 'default',
  },
)

type ButtonProps<T extends ValidComponent = 'button'> = ButtonRootProps<T> &
  VariantProps<typeof buttonVariants> & {
    class?: string
  }

function Button<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, ButtonProps<T>>) {
  const [local, rest] = splitProps(props as ButtonProps, [
    'class',
    'variant',
    'size',
  ])

  return (
    <ButtonPrimitive
      class={cls(
        buttonVariants({
          size: local.size,
          variant: local.variant,
        }),
        local.class,
      )}
      {...rest}
    />
  )
}

export { Button, type ButtonProps }
