export interface SupportedLanguage {
  id: string
  title: string
  isDefault?: boolean
  [key: string]: unknown
}

export const supportedLanguages: SupportedLanguage[] = [
  {id: 'en', title: 'English 🇬🇧'},
  {id: 'it', title: 'Italian 🇮🇹'},
]

export const baseLanguage: SupportedLanguage =
  supportedLanguages.find((l: SupportedLanguage) => l.isDefault) || supportedLanguages[0]
