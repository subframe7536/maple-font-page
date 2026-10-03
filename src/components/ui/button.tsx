import type { ButtonProps as MoraineButtonProps, ValidComponent } from 'moraine'

import { cls } from 'cls-variant'
import { Button as MoraineButton } from 'moraine'
import { splitProps } from 'solid-js'

// Keep the original page's four button appearances on Moraine's interaction primitive.
export type ButtonProps<T extends ValidComponent = 'button'> = Omit<MoraineButtonProps<T>, 'variant' | 'size'> & {
  variant?: 'default' | 'secondary' | 'outline' | 'link'
  size?: 'default' | 'sm' | 'md' | 'lg' | 'icon'
}
export function Button<T extends ValidComponent = 'button'>(props: ButtonProps<T>) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'class'])
  return (
    <MoraineButton
      {...rest as MoraineButtonProps<T>}
      variant={local.variant ?? 'default'}
      size={local.size === 'icon' ? 'icon-md' : local.size === 'default' ? 'md' : local.size ?? 'md'}
      class={cls(
        'maple-button',
        `maple-button-${local.variant ?? 'default'}`,
        `maple-button-size-${local.size ?? 'default'}`,
        local.variant === 'link' && 'animated-underline',
        typeof local.class === 'string' ? local.class : '',
      )}
    />
  )
}
