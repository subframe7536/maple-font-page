import { useLocation } from '@solidjs/router'
import { Button } from 'moraine'
import { useIntlayer } from 'solid-intlayer'
import { Show } from 'solid-js'

import Icon from '@/components/icon'
import { localePath, routePath, siteLocale } from '@/locales/i18n'
import { tag } from '@/utils/constant'

export default function Nav() {
  const location = useLocation()
  const content = useIntlayer('nav')
  const pathname = () => routePath(location.pathname).replace(/\/$/, '')
  const home = () => /^\/(?:en|zh-cn)$/.test(pathname())
  const current = (page: string) => pathname().endsWith(`/${page}`)
  return (
    <nav
      class="fixed z-49 w-full flex items-center bg-background/50 p-2 backdrop-blur-lg"
      aria-label="Main navigation"
    >
      <a href={localePath()} title="Home Page">
        <img
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt="Maple Mono Icon"
          class="h-6 cursor-pointer hover:scale-110"
        />
      </a>
      <div class="ml-2 w-full flex justify-between">
        <div class="flex select-none items-center">
          <Show
            when={home()}
            fallback={
              <a
                href={localePath()}
                class="ml--2 hidden gap-2 pl-4 text-5.4 c-accent font-bold xs:block"
              >
                Maple Mono <span class="hidden text-sm c-note sm:inline">{tag}</span>
              </a>
            }
          >
            <div class="hidden whitespace-nowrap sm:block">
              <Button as="a" size="md" variant="link" href="#why">
                {content.messages.why}
              </Button>
              <Button as="a" size="md" variant="link" href="#features">
                {content.messages.features}
              </Button>
              <Button as="a" size="md" variant="link" href="#preview">
                {content.messages.preview}
              </Button>
              <Button as="a" size="md" variant="link" href="#credits">
                {content.messages.credits}
              </Button>
            </div>
          </Show>
        </div>
        <div class="flex items-center">
          <Button
            as="a"
            size="md"
            variant="link"
            href="https://github.com/subframe7536/maple-font"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" class="sm:mr-1" />
            <span class="hidden sm:block">GitHub</span>
          </Button>
          <Button
            as="a"
            size="md"
            variant="link"
            href={localePath(siteLocale(), 'playground')}
            aria-current={current('playground') ? 'page' : undefined}
            title={content.messages.titles.playground.value}
            aria-label={content.messages.titles.playground.value}
          >
            <Icon name="lucide:bug-play" class="sm:mr-1" />
            <span class="hidden sm:block">{content.messages.titles.playground}</span>
          </Button>
          <Button
            as="a"
            size="md"
            variant="link"
            href={localePath(siteLocale(), 'usage')}
            aria-current={current('usage') ? 'page' : undefined}
            title={content.messages.titles.usage.value}
            aria-label={content.messages.titles.usage.value}
          >
            <Icon name="lucide:book-open-text" class="sm:mr-1" />
            <span class="hidden sm:block">{content.messages.titles.usage}</span>
          </Button>
          <Button
            as="a"
            size="md"
            variant={current('download') ? 'secondary' : 'default'}
            class="ml-2"
            href={localePath(siteLocale(), 'download')}
            aria-current={current('download') ? 'page' : undefined}
            title={content.messages.titles.download.value}
            aria-label={content.messages.titles.download.value}
          >
            {content.messages.get}
          </Button>
          <a
            class="ml-3 mr-1 text-xs c-note hover:c-primary focus-visible:effect-fv"
            href={
              localePath(
                siteLocale() === 'en' ? 'zh-cn' : 'en',
                pathname().split('/').slice(2).join('/'),
              ) +
              location.search +
              location.hash
            }
            aria-label={siteLocale() === 'en' ? '简体中文' : 'English'}
          >
            {siteLocale() === 'en' ? '中' : 'EN'}
          </a>
        </div>
      </div>
    </nav>
  )
}
