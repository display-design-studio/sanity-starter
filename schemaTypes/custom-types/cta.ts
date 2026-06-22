import {SparklesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {baseLanguage} from '../../utils/localization'
import {hiddenUnless, requireWhen} from '../../utils/schema'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ref',
      title: 'Reference',
      type: 'object',
      options: {collapsible: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'type',
          title: 'Reference type',
          type: 'string',
          initialValue: 'internal',
          options: {
            list: [
              {title: 'Internal', value: 'internal'},
              {title: 'External', value: 'external'},
              {title: 'File', value: 'file'},
            ],
            layout: 'dropdown',
          },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'internalRef',
          title: 'Reference',
          type: 'reference',
          to: [{type: 'home'}, {type: 'page'}],
          hidden: hiddenUnless('internal'),
          validation: requireWhen('internal', 'Internal reference is required'),
        }),
        defineField({
          name: 'externalRef',
          title: 'External URL',
          type: 'url',
          hidden: hiddenUnless('external'),
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}).custom((value, context) => {
              const parent = context.parent as {type?: string} | undefined
              return parent?.type !== 'external' || value ? true : 'External URL is required'
            }),
        }),
        defineField({
          name: 'fileRef',
          title: 'File',
          type: 'file',
          hidden: hiddenUnless('file'),
          validation: requireWhen('file', 'File is required', (v) => !!(v as {asset?: unknown})?.asset),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: `label.${baseLanguage.id}`,
      referenceType: 'ref.type',
    },
    prepare({title, referenceType}) {
      return {
        title: title || 'Custom CTA',
        subtitle: referenceType ? `${referenceType} link` : 'Custom CTA',
        media: SparklesIcon,
      }
    },
  },
})
