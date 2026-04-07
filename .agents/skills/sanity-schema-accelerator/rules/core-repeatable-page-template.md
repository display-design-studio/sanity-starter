# Repeatable Page Document Template

Use this for routable pages like about/contact/legal with localized title and slug.

## Default output

```ts
import { defineField, defineType } from 'sanity'
import { baseGroups } from '../../utils/groups'
import { baseLanguage } from '../../utils/localization'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  options: {
    languageFilter: true,
  },
  groups: baseGroups,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'editorial',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      group: 'editorial',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'editorial',
    }),
    defineField({
      name: 'seo',
      title: 'Seo',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      slug: `slug.["${baseLanguage?.id}"].current`,
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      }
    },
  },
})
```

## Fill-in rules

- Keep `name: 'page'` for generic repeatable pages unless project already uses `aboutPage` style types.
- For a specific route request (for example "about"), create a document instance of `page`; do not force singleton unless requested.
- Keep preview select tied to `baseLanguage`.
