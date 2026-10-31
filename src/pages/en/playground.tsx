import { createRoute } from 'solid-file-router'

import PlaygroundPage from '@/layouts/playground'
import { pageMetadata } from '@/utils/metadata'
export default createRoute({
  metadata: pageMetadata('en', 'playground'),
  component: PlaygroundPage,
})
