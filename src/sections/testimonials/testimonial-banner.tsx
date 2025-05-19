import type { CarouselApi } from '@/components/ui/carousel'

import { cls } from 'cls-variant'
import Autoplay from 'embla-carousel-autoplay'
import { createEffect, createSignal, Index } from 'solid-js'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export interface ItemData {
  content: string
  author: string
  platform: string
}

interface Props {
  class?: string
  items: ItemData[]
}

type API = Exclude<ReturnType<CarouselApi>, undefined>

function TestimonialItem(props: ItemData) {
  return (
    <div class="flex flex-col select-none items-center justify-center gap-8 text-center md:(flex-row justify-between gap-12 text-left)">
      <div class="flex flex-row items-center gap-4">
        <div
          class="size-16 rounded-full bg-primary text-(center 10) c-background leading-[4rem]"
        >
          {props.author[0].toUpperCase()}
        </div>
        <div class="flex flex-col items-start gap-1">
          <div class="text-accent font-500">{props.author}</div>
          <div class="text-sm c-primary/50">{props.platform}</div>
        </div>
      </div>
      <blockquote class="relative max-w-xl p-4 text-lg font-light leading-relaxed md:(mb-0 mr-8 w-60%)">
        <span class="absolute left--2 top--4 text-4xl c-primary/50 md:left--6">&#x250F</span>
        <span class="inline-block font-italic">
          {props.content}
        </span>
        <span class="absolute bottom--4 right--2 text-4xl c-primary/50">&#x251B</span>
      </blockquote>
    </div>
  )
}

export function TestimonialBanner(props: Props) {
  const [api, setApi] = createSignal<API | undefined>()
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const updateIndex = (a: API) => {
    setSelectedIndex(a.selectedScrollSnap())
  }
  createEffect(() => {
    const inner = api()
    if (!inner) {
      return
    }
    updateIndex(inner)
    inner.on('reInit', updateIndex).on('select', updateIndex)
  })
  return (
    <Carousel
      class={props.class}
      plugins={[Autoplay({
        delay: 5000,
        playOnInit: true,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      })]}
      setApi={setApi}
    >
      <CarouselContent>
        <Index each={props.items}>
          {item => (
            <CarouselItem>
              <TestimonialItem {...item()} />
            </CarouselItem>
          )}
        </Index>
      </CarouselContent>
      <div class="mt-4 flex justify-center">
        <Index each={Array.from({ length: props.items.length })}>
          {(_, i) => (
            <div
              class={cls(
                'm-1 size-2 cursor-pointer rounded-full transition-background-color-500',
                selectedIndex() === i ? 'bg-secondary' : 'bg-muted',
              )}
              onClick={() => api()?.scrollTo(i)}
            />
          )}
        </Index>
      </div>
    </Carousel>
  )
}
