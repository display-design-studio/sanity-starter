import {defineType, defineField} from 'sanity'
import {type supportedLanguage, supportedLanguages} from '../../utils/localization'

export const localeString = defineType({
  title: 'Localized string',
  name: 'localeString',
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
      type: 'string',
      fieldset: lang.isDefault ? null : 'translations',
    }),
  ),
})
