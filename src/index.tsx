import { createClientEntry } from 'solid-file-router'
import { FileRouter } from 'virtual:routes'

import '@subf/unocss/reset-tailwind.css'
import 'moraine/icon.css'
import 'uno.css'
import './style.css'
createClientEntry(() => <FileRouter base={import.meta.env.BASE_URL} />, document.getElementById('app')!)
