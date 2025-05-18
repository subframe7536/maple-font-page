import type { PolymorphicProps } from '@kobalte/core'
import type { ValidComponent } from 'solid-js'

import * as TextFieldPrimitive from '@kobalte/core/text-field'
import { cls, clsv, clsvDefault } from 'cls-variant'
import { mergeProps, splitProps } from 'solid-js'

type TextFieldRootProps<T extends ValidComponent = 'div'> =
  TextFieldPrimitive.TextFieldRootProps<T> & {
    class?: string | undefined
  }

function TextField<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, TextFieldRootProps<T>>) {
  const [local, others] = splitProps(props as TextFieldRootProps, ['class'])
  return (
    <TextFieldPrimitive.Root
      class={cls('flex flex-col gap-1', local.class)}
      {...others}
    />
  )
}

type TextFieldInputProps<T extends ValidComponent = 'input'> =
  TextFieldPrimitive.TextFieldInputProps<T> & {
    class?: string | undefined
    type?:
      | 'button'
      | 'checkbox'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'file'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'radio'
      | 'range'
      | 'reset'
      | 'search'
      | 'submit'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
  }

function TextFieldInput<T extends ValidComponent = 'input'>(rawProps: PolymorphicProps<T, TextFieldInputProps<T>>) {
  const props = mergeProps<TextFieldInputProps<T>[]>({ type: 'text' }, rawProps)
  const [local, others] = splitProps(props as TextFieldInputProps, ['type', 'class'])
  return (
    <TextFieldPrimitive.Input
      type={local.type}
      class={cls(
        'flex h-10 w-full rounded-md b-(1 input) bg-transparent px-3 py-2 text-sm ring-offset-background file:(border-0 bg-transparent text-sm font-medium) placeholder:c-note focus-visible:effect-fv disabled:effect-dis data-[invalid]:b-red',
        local.class,
      )}
      {...others}
    />
  )
}

type TextFieldTextAreaProps<T extends ValidComponent = 'textarea'> =
  TextFieldPrimitive.TextFieldTextAreaProps<T> & { class?: string | undefined }

function TextFieldTextArea<T extends ValidComponent = 'textarea'>(props: PolymorphicProps<T, TextFieldTextAreaProps<T>>) {
  const [local, others] = splitProps(props as TextFieldTextAreaProps, ['class'])
  return (
    <TextFieldPrimitive.TextArea
      class={cls(
        'flex min-h-80px w-full rounded-md b-(1 input) bg-background px-3 py-2 text-sm ring-offset-background placeholder:c-note focus-visible:effect-fv disabled:effect-dis',
        local.class,
      )}
      {...others}
    />
  )
}

const labelVariants = clsvDefault(
  clsv(
    'text-sm font-500 leading-none peer-disabled:effect-dis c-note',
    {
      variant: {
        label: 'data-[invalid]:c-red',
        description: 'font-normal text-muted-foreground',
        error: 'text-(xs note)',
      },
    },
  ),
  {
    variant: 'label',
  },
)

type TextFieldLabelProps<T extends ValidComponent = 'label'> =
  TextFieldPrimitive.TextFieldLabelProps<T> & { class?: string | undefined }

function TextFieldLabel<T extends ValidComponent = 'label'>(props: PolymorphicProps<T, TextFieldLabelProps<T>>) {
  const [local, others] = splitProps(props as TextFieldLabelProps, ['class'])
  return <TextFieldPrimitive.Label class={cls(labelVariants(), local.class)} {...others} />
}

type TextFieldDescriptionProps<T extends ValidComponent = 'div'> =
  TextFieldPrimitive.TextFieldDescriptionProps<T> & {
    class?: string | undefined
  }

function TextFieldDescription<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, TextFieldDescriptionProps<T>>) {
  const [local, others] = splitProps(props as TextFieldDescriptionProps, ['class'])
  return (
    <TextFieldPrimitive.Description
      class={cls(labelVariants({ variant: 'description' }), local.class)}
      {...others}
    />
  )
}

type TextFieldErrorMessageProps<T extends ValidComponent = 'div'> =
  TextFieldPrimitive.TextFieldErrorMessageProps<T> & {
    class?: string | undefined
  }

function TextFieldErrorMessage<T extends ValidComponent = 'div'>(props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>) {
  const [local, others] = splitProps(props as TextFieldErrorMessageProps, ['class'])
  return (
    <TextFieldPrimitive.ErrorMessage
      class={cls(labelVariants({ variant: 'error' }), local.class)}
      {...others}
    />
  )
}

export {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
}
