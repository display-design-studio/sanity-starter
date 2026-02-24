---
title: Always Assign Icons
description: Every document and object type should have an icon from @sanity/icons
tags: studio, icons, ux, schema
---

## Always Assign Icons

Always assign an icon from `@sanity/icons` to documents and objects. Icons significantly improve Studio navigation and visual hierarchy.

**Incorrect (no icons):**

```typescript
// ❌ Generic icons make navigation harder
defineType({
  name: 'article',
  type: 'document',
  fields: [/* ... */]
})

defineType({
  name: 'hero',
  type: 'object',
  fields: [/* ... */]
})
```

**Correct (with icons):**

```typescript
import { DocumentTextIcon, BlockContentIcon } from '@sanity/icons'

defineType({
  name: 'article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [/* ... */]
})

defineType({
  name: 'hero',
  type: 'object',
  icon: BlockContentIcon,
  fields: [/* ... */]
})
```

### Common Icon Mappings

| Content Type | Icon |
|--------------|------|
| Article, Post | `DocumentTextIcon` |
| Author, Person | `UserIcon` |
| Category, Tag | `TagIcon` |
| Settings | `CogIcon` |
| Page | `DocumentIcon` |
| Image block | `ImageIcon` |
| Video block | `PlayIcon` |
| FAQ | `HelpCircleIcon` |
| Link | `LinkIcon` |

### Browse All Icons

```bash
# Install and explore
npm install @sanity/icons
```

Browse all icons at [icons.sanity.build](https://icons.sanity.build/all)

Reference: [Schemas and Forms](https://www.sanity.io/docs/studio/schemas-and-forms)
