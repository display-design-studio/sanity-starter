import {defineField} from 'sanity'

export default defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  group: 'seo',
  description: 'Seo related fields, such as meta title, description and image',
  options: {
    collapsed: false,
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Site title',
      description: 'Title used for SEO purposes, such as meta title and Open Graph title',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Description used for SEO purposes, such as meta description and Open Graph description',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Image used for SEO purposes, such as Open Graph and Twitter cards',
      type: 'image',
    }),
  ],
})
