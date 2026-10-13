import 'sanity'

declare module 'sanity' {
  interface DocumentOptions {
    languageFilter?: boolean
  }
}
