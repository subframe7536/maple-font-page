import type { ButtonRootProps } from '@kobalte/core/button'
import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { ValidComponent } from 'solid-js'
import { Button as ButtonPrimitive } from '@kobalte/core/button'
import { cls, clsv, clsvDefault, type VariantProps } from 'cls-variant'
import { splitProps } from 'solid-js'

export const buttonVariants = clsvDefault(
  clsv(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition fv-effect disabled:(pointer-events-none opacity-50) select-none whitespace-nowrap',
    {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline: 'b-(2 border) bg-background shadow-sm hover:(b-secondary bg-accent-foreground)',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
  ),
  {
    variant: 'default',
    size: 'default',
  },
)

type buttonProps<T extends ValidComponent = 'button'> = ButtonRootProps<T> &
  VariantProps<typeof buttonVariants> & {
    class?: string
  }

export function Button<T extends ValidComponent = 'button'>(props: PolymorphicProps<T, buttonProps<T>>) {
  const [local, rest] = splitProps(props as buttonProps, [
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
