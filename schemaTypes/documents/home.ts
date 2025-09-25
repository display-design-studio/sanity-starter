import {defineType, defineField} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
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
  ],
  preview: {
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
