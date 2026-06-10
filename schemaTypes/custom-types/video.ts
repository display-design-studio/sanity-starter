import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  description: 'Responsive video with desktop and mobile versions',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'desktop',
      title: 'Desktop',
      type: 'file',
      options: {accept: 'video/mp4'},
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile',
      description: 'Optional. If not provided, the desktop video is used on all viewports.',
      type: 'file',
      options: {accept: 'video/mp4'},
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Responsive video',
        media: PlayIcon,
      }
    },
  },
})
