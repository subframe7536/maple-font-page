import { For } from 'solid-js'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

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
          <AccordionItem value={`item-${idx()}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
