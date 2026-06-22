import {defineField, defineType} from 'sanity'
import {supportedLanguages, type SupportedLanguage} from './localization'

export function createLocaleType(
  name: string,
  title: string,
  type: string,
  fieldOptions?: Record<string, unknown> | ((lang: SupportedLanguage) => Record<string, unknown>)
) {
  return defineType({
    title: `Localized ${title}`,
    name,
    type: 'object',
    fieldsets: [{title: 'Translations', name: 'translations', options: {collapsible: true}}],
    fields: supportedLanguages.map((lang) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defineField({
        title: lang.title,
        name: lang.id,
        type,
        fieldset: lang.isDefault ? undefined : 'translations',
        ...(typeof fieldOptions === 'function' ? fieldOptions(lang) : (fieldOptions ?? {})),
      } as any)
    ),
  })
}
