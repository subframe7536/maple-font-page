import { defineTheme } from 'moraine/theme'

export const mapleTheme = defineTheme({
  button: {
    defaultVariants: { size: 'lg' },
    base: {
      'root': 'gap-0 rounded-md font-500',
      'label': 'inline-flex items-center justify-center',
      '--fw': 500,
    },
    variants: {
      variant: {
        default: { root: 'shadow-sm' },
        secondary: { root: 'shadow-sm' },
        outline: { root: 'border-2 text-border shadow-sm' },
        link: { root: 'animated-underline w-fit text-inherit hover:no-underline aria-[current=page]:text-secondary' },
      },
      size: {
        'sm': { root: 'h-8 px-3 text-xs' },
        'md': { root: 'px-4 text-xs md:text-sm' },
        'lg': { root: 'px-4 py-2 text-sm' },
        'xl': { root: 'h-12 px-8' },
        'icon-lg': { root: 'p-0' },
      },
    },
  },
  tabs: {
    base: { trigger: 'h-7 min-w-12 px-3 py-1 text-foreground data-selected:font-600' },
    variants: { variant: { pill: { indicator: 'border-0 shadow-none' } } },
  },
  dialog: {
    base: {
      content: 'w-[90%] max-w-xl max-h-[90dvh] sm:max-h-[90dvh] p-4 gap-4 rounded-lg overflow-auto',
      footer: 'bg-transparent p-0 mt-4',
      title: 'text-xl',
    },
  },
  slider: {
    base: { track: 'bg-primary/50' },
    variants: {
      size: { md: { '--s-size': '8px', '--s-thumb-size': '20px' } },
      variant: { default: { thumb: 'border-2 border-secondary' } },
    },
  },
})
