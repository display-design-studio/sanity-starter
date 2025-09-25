import {defineType, defineField} from 'sanity'
import {baseLanguage} from '../../utils/localization'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  options: {
    languageFilter: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeBlock',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
    prepare(selection: any) {
      const {title} = selection
      return {
        title,
      }
    },
  },
})
