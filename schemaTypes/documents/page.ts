import {defineField, defineType} from 'sanity'
import {baseLanguage} from '../../utils/localization'
import seo from '../custom-types/seo'
import {groups} from '../../utils/groups'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  options: {
    languageFilter: true,
  },
  groups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'page',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      group: 'page',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeBlock',
      group: 'content',
    }),
    seo,
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
