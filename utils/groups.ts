import { BarChartIcon } from '@sanity/icons/BarChart'
import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { DocumentIcon } from '@sanity/icons/Document'
import type { FieldGroupDefinition } from 'sanity'

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
