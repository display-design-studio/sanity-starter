import {defineType, defineField} from 'sanity'
import {type supportedLanguage, supportedLanguages} from '../../utils/localization'

export const localeText = defineType({
  title: 'Localized text',
  name: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {collapsible: true},
    },
  ],
  fields: supportedLanguages.map((lang: supportedLanguage) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'text',
      fieldset: lang.isDefault ? null : 'translations',
    }),
  ),
})
