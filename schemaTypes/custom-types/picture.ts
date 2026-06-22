import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const picture = defineType({
  name: 'picture',
  title: 'Picture',
  description: 'Responsive image with desktop and mobile versions',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'desktop',
      title: 'Desktop',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile',
      description: 'Optional. If not provided, the desktop image is used on all viewports.',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      media: 'desktop',
    },
    prepare({media}) {
      return {
        title: 'Responsive image',
        media,
      }
    },
  },
})
