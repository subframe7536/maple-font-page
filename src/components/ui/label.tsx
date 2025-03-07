import type { Component, ComponentProps } from 'solid-js'

import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

const Label: Component<ComponentProps<'label'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return (
    <label
      class={cls(
        'text-sm font-500 leading-none peer-disabled:effect-dis',
        local.class,
      )}
      {...others}
    />
  )
}

export { Label }
