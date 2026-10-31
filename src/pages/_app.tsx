import { useIsRouting, useLocation } from '@solidjs/router'
import { MoraineProvider } from 'moraine'
import { createRoute } from 'solid-file-router'
import { MDXProvider } from 'solid-file-router/mdx'
import type { ParentProps } from 'solid-js'
import { createEffect, on, onMount, Show, Suspense } from 'solid-js'

import { CodeHtml } from '@/components/code-html'
import DocumentLayout from '@/layouts/document'
import type { SiteLocale } from '@/locales/i18n'
import { I18nProvider, routePath } from '@/locales/i18n'
import Nav from '@/sections/nav'
import { mapleTheme } from '@/theme'
import { loadMapleMono } from '@/utils/loadFont'

function Shell(props: ParentProps) {
  const location = useLocation()
  const isRouting = useIsRouting()
  let main: HTMLElement | undefined
  const locale = (): SiteLocale =>
    routePath(location.pathname).split('/')[1] === 'zh-cn' ? 'zh-cn' : 'en'
  const playground = () => routePath(location.pathname).replace(/\/$/, '').endsWith('/playground')
  onMount(() => {
    void loadMapleMono().catch(console.error)
  })
  createEffect(() => {
    document.documentElement.lang = locale() === 'zh-cn' ? 'zh-CN' : 'en'
    // The router updates head links after navigation; retain hreflang attributes.
    void location.pathname
    queueMicrotask(() => {
      document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]').forEach((link) => {
        link.hreflang = link.href.includes('/zh-cn') ? 'zh-CN' : 'en'
      })
    })
  })
  createEffect(
    on(
      () => [location.pathname, location.hash, isRouting()] as const,
      ([, hash, routing]) => {
        if (routing) {
          return
        }
        if (!hash) {
          main?.scrollTo({ top: 0 })
        } else {
          requestAnimationFrame(() => {
            try {
              document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
            } catch {}
          })
        }
      },
    ),
  )
  return (
    <Show when={locale()} keyed>
      {(lang) => (
        <I18nProvider locale={lang}>
          <MoraineProvider theme={mapleTheme}>
            <MDXProvider components={{ DocumentLayout, CodeHtml }}>
              <Nav />
              <main
                ref={(element) => (main = element)}
                class={
                  playground()
                    ? 'h-dvh w-full pt-8'
                    : 'h-dvh w-full of-(x-hidden y-scroll) scroll-smooth'
                }
              >
                <Suspense>{props.children}</Suspense>
              </main>
            </MDXProvider>
          </MoraineProvider>
        </I18nProvider>
      )}
    </Show>
  )
}
export default createRoute({ component: Shell })
