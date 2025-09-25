import {defineType, defineField, Rule} from 'sanity'
import {type supportedLanguage, supportedLanguages} from '../../utils/localization'

export const localeSlug = defineType({
  title: 'Localized slug',
  name: 'localeSlug',
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
      type: 'slug',
      options: {
        source: `title.${lang.id}`,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
        validation: (Rule: Rule) => Rule.required(),
      },
      fieldset: lang.isDefault ? null : 'translations',
    }),
  ),
})
