import 'solid-js'

declare module 'solid-js' {
  namespace JSX {
    // Force textarea updates to the DOM property during SSG hydration.
    interface ExplicitProperties {
      value: string
    }
  }
}
