import { createRoute } from 'solid-file-router'
import { onMount } from 'solid-js'

import { localePath } from '@/locales/i18n'
export default createRoute({
  component: () => {
    onMount(() => {
      const language = navigator.language.toLowerCase()
      location.replace(
        localePath(language.startsWith('zh') ? 'zh-cn' : 'en') + location.search + location.hash,
      )
    })
    return (
      <div class="mx-auto max-w-4xl p-6 pt-20">
        <h1>Maple Mono</h1>
        <a href={localePath('en')}>English</a>
        {' · '}
        <a href={localePath('zh-cn')}>简体中文</a>
      </div>
    )
  },
})
