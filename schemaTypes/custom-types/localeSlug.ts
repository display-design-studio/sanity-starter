import {type Rule} from 'sanity'
import {createLocaleType} from '../../utils/locale'
import type {SupportedLanguage} from '../../utils/localization'

export const localeSlug = createLocaleType('localeSlug', 'slug', 'slug', (lang: SupportedLanguage) => ({
  options: {
    source: `title.${lang.id}`,
    slugify: (input: string) =>
      input
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ''),
    validation: (Rule: Rule) => Rule.required(),
  },
}))
