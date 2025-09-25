import {defineType, defineField} from 'sanity'
import {type supportedLanguage, supportedLanguages} from '../../utils/localization'

export const localeBlock = defineType({
  title: 'Localized block',
  name: 'localeBlock',
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
      type: 'array',
      of: [{type: 'block'}],
      fieldset: lang.isDefault ? null : 'translations',
    }),
  ),
})
