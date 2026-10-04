import { createRoute } from 'solid-file-router'

import { localePath } from '@/locales/i18n'
export default createRoute({
  metadata: { title: '404 PAGE NOT FOUND | Maple Mono' },
  component: () => (
    <div class="mx-auto max-w-4xl p-6 pt-20">
      <h1 class="text-2xl">404 PAGE NOT FOUND</h1>
      <a href={localePath('en')}>TOP PAGE</a>
    </div>
  ),
})
