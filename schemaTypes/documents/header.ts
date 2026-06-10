import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [defineArrayMember({type: 'cta'})],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header',
        media: DocumentIcon,
      }
    },
  },
})
