# Page Builder Array Template

Use this to define the reusable `pageBuilder` array schema.

## Default output

```ts
import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  title: 'Page Builder',
  description: 'Page Builder section for custom layouts',
  name: 'pageBuilder',
  type: 'array',
  of: [
    // defineArrayMember({ type: 'heroBlock' }),
    // defineArrayMember({ type: 'richTextBlock' }),
  ],
  options: {
    layout: 'list',
    insertMenu: {
      filter: true,
      views: [
        { name: 'list' },
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) => `/static/preview/${schemaTypeName}.png`,
        },
      ],
    },
  },
})
```

## Fill-in rules

- Add each requested block with `defineArrayMember({ type: '<blockName>' })`.
- Keep `name: 'pageBuilder'` unless user asks to rename globally.
- Keep list + grid insert views as default.
