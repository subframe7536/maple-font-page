import type { Component, ComponentProps } from 'solid-js'

import { cls } from 'cls-variant'
import { splitProps } from 'solid-js'

const Label: Component<ComponentProps<'label'>> = (props) => {
  const [local, others] = splitProps(props, ['class'])
  return (
    <label
      class={cls(
        'text-sm font-medium leading-none peer-disabled:(cursor-not-allowed opacity-70)',
        local.class,
      )}
      {...others}
    />
  )
}

export { Label }
