import { createRoute } from 'solid-file-router'

import Home from '@/layouts/home'
import { pageMetadata } from '@/utils/metadata'
export default createRoute({ metadata: pageMetadata('zh-cn'), component: Home })
