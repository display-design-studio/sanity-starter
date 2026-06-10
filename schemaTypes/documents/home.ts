import {defineField, defineType} from 'sanity'
import seo from '../custom-types/seo'
import {groups} from '../../utils/groups'

export const home = defineType({
  name: 'home',
  title: 'Home',
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
    defineField({
      name: 'media',
      title: 'Media',
      type: 'media',
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      group: 'content',
    }),
    seo,
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
