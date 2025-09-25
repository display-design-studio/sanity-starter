export interface supportedLanguage {
  id: string
  title: string
  isDefault?: boolean
}

export const supportedLanguages: supportedLanguage[] = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'it', title: 'Italian'},
]

export const baseLanguage: supportedLanguage = supportedLanguages.find(
  (l: supportedLanguage) => l.isDefault,
)
