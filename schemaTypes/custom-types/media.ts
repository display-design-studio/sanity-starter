import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { defineField, defineType } from 'sanity'
import { hiddenUnless } from '../../utils/schema'

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Media type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Embed', value: 'embed'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'picture',
      hidden: hiddenUnless('image'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {type?: string} | undefined
          const picture = value as {desktop?: {asset?: unknown}} | undefined

          return parent?.type !== 'image' || picture?.desktop?.asset
            ? true
            : 'Desktop image is required'
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      hidden: hiddenUnless('video'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {type?: string} | undefined
          const video = value as {desktop?: {asset?: unknown}} | undefined

          return parent?.type !== 'video' || video?.desktop?.asset
            ? true
            : 'Desktop video is required'
        }),
    }),
    defineField({
      name: 'embed',
      title: 'Embed',
      type: 'object',
      hidden: hiddenUnless('embed'),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {type?: string} | undefined
          const embed = value as {desktop?: string} | undefined

          return parent?.type !== 'embed' || embed?.desktop
            ? true
            : 'Desktop embed code is required'
        }),
      fields: [
        defineField({
          name: 'desktop',
          title: 'Desktop',
          type: 'text',
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mobile',
          title: 'Mobile',
          description: 'Optional. If not provided, the desktop embed is used on all viewports.',
          type: 'text',
          rows: 4,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      type: 'type',
      image: 'image.desktop',
    },
    prepare({type, image}) {
      return {
        title: type ? `Media: ${type}` : 'Media',
        media: image || BlockContentIcon,
      }
    },
  },
})
