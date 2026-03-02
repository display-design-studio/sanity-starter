---
title: Configure Block Previews
description: Every block needs title, subtitle (block type name), and icon for Studio UX
tags: page-builder, studio, preview, icons
---

## Configure Block Previews

Every page builder block should have consistent previews with title, subtitle (block type name), and icon. This makes the Studio experience clear and navigable.

**Incorrect (no preview):**

```typescript
// ❌ No preview - shows generic "Object" in Studio
defineType({
  name: 'hero',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
  ]
})
```

**Correct (with preview):**

```typescript
import { BlockContentIcon } from '@sanity/icons'

defineType({
  name: 'hero',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
  ],
  preview: {
    select: { 
      title: 'title', 
      media: 'image' 
    },
    prepare({ title, media }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Hero',  // Block type name
        media: media ?? BlockContentIcon,  // Fallback to icon
      }
    },
  },
})
```

### Preview Best Practices

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | Primary content identifier | Headline, name |
| `subtitle` | Block type name | "Hero", "Features", "FAQ" |
| `media` | Visual identifier | Image or icon fallback |

### Visual Insert Menu

For a polished insert menu with thumbnails:

```typescript
defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [/* blocks */],
  options: {
    insertMenu: {
      views: [
        { 
          name: 'grid', 
          previewImageUrl: (type) => `/block-previews/${type}.png` 
        },
      ],
    },
  },
})
```

Reference: [Schema Previews](https://www.sanity.io/docs/studio/previews-list-views)
