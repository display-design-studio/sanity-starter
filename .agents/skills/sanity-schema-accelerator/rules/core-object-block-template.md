# Object Block Template

Use this for page builder components (`type: 'object'`).

## Default output

```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newSchema',
  title: 'New Schema',
  type: 'object',
  fields: [

  ],
  preview: {
    prepare() {
      return {
        title: 'New Schema',
      }
    },
  },
})
```

## Fill-in rules

- `name`: use camelCase, unique across schema types.
- `title`: human readable label.
- `fields`: add only requested fields; keep order stable.
- `preview.title`: mirror schema title unless a custom field select is explicitly requested.
