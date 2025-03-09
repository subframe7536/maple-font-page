import { For } from 'solid-js'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'

interface Props {
  faqs: {
    question: string
    answer: string
  }[]
}
export default function FaqItems(props: Props) {
  return (
    <Accordion collapsible class="w-full">
      <For each={props.faqs}>
        {(item, idx) => (
          <AccordionItem value={`item-${idx()}`} class="my-2">
            <AccordionTrigger class="text-(left lg) font-500 md:text-xl">
              <div class="w-90% text-primary">
                {item.question}
              </div>
            </AccordionTrigger>
            <AccordionContent class="leading-relaxed">{item.answer}</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
