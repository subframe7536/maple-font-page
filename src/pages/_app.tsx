import type { ParentProps } from 'solid-js'

import { useIsRouting, useLocation } from '@solidjs/router'
import { MoraineProvider } from 'moraine'
import { createRoute } from 'solid-file-router'
import { MDXProvider } from 'solid-file-router/mdx'
import { IntlayerProvider } from 'solid-intlayer'
import { createEffect, on, onMount, Show, Suspense } from 'solid-js'

import { CodeHtml } from '@/components/code-html'
import DocumentLayout from '@/layouts/document'
import { routePath } from '@/locales/i18n'
import Nav from '@/sections/nav'
import { loadMapleMono } from '@/utils/loadFont'

function Shell(props: ParentProps) {
  const location = useLocation()
  const isRouting = useIsRouting()
  let main: HTMLElement | undefined
  const locale = () => routePath(location.pathname).split('/')[1] === 'zh-cn' ? 'zh-CN' : 'en'
  const playground = () => routePath(location.pathname).replace(/\/$/, '').endsWith('/playground')
  onMount(() => {
    void loadMapleMono().catch(console.error)
  })
  createEffect(() => {
    document.documentElement.lang = locale()
    // The router updates head links after navigation; retain hreflang attributes.
    void location.pathname
    queueMicrotask(() => {
      document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]').forEach((link) => {
        link.hreflang = link.href.includes('/zh-cn') ? 'zh-CN' : 'en'
      })
    })
  })
  createEffect(on(() => [location.pathname, location.hash, isRouting()] as const, ([, hash, routing]) => {
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
  }))
  return (
    <Show when={locale()} keyed>
      {lang => (
        <IntlayerProvider locale={lang} isCookieEnabled={false}>
          <MoraineProvider>
            <MDXProvider components={{ DocumentLayout, CodeHtml }}>
              <Nav />
              <main ref={main} class={playground() ? 'h-dvh w-full pt-8' : 'h-dvh w-full of-(x-hidden y-scroll) scroll-smooth'}>
                <Suspense>{props.children}</Suspense>
              </main>
            </MDXProvider>
          </MoraineProvider>
        </IntlayerProvider>
      )}
    </Show>
  )
}
export default createRoute({ component: Shell })
