import { subfLint } from '@subf/config/oxlint'

export default subfLint({
  solid: true,
  options: { typeAware: true },
  ignorePatterns: ['data/**'],
})
