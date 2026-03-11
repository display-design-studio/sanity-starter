import { defineField, defineType } from 'sanity'
import { baseLanguage } from '../../utils/localization'

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
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
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
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      slug: `slug.["${baseLanguage?.id}"].current`,
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})
