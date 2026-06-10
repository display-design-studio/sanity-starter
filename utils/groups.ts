import type {FieldGroupDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {BlockContentIcon} from '@sanity/icons'
import {BarChartIcon} from '@sanity/icons'

export const groups: FieldGroupDefinition[] = [
  {
    name: 'page',
    title: 'Page',
    default: true,
    icon: DocumentIcon,
  },
  {
    name: 'content',
    title: 'Content',
    icon: BlockContentIcon,
  },
  {
    name: 'seo',
    title: 'SEO',
    icon: BarChartIcon,
  },
]
