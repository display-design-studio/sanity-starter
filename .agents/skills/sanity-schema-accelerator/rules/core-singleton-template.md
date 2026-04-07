# Singleton Document Template

Use this for fixed pages (for example home/about as singleton).

## Default output

```ts
import { defineField, defineType } from 'sanity'
import { baseGroups } from '../../utils/groups'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  options: {
    languageFilter: true,
  },
  groups: baseGroups,
  fields: [
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
    prepare() {
      return {
        title: 'Home',
      }
    },
  },
})
```

## Fill-in rules

- For singleton about page, change `home` -> `about` and `Home` -> `About`.
- Keep `pageBuilder` and `seo` unless user explicitly removes one.
- Keep `groups: baseGroups` for editor consistency.
