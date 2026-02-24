---
title: Always Use Define Helpers
description: Use defineType, defineField, and defineArrayMember for type safety
tags: schema, typescript, best-practices, syntax
---

## Always Use Define Helpers

Always use `defineType`, `defineField`, and `defineArrayMember` from `sanity`. These helpers provide type safety, autocompletion, and ensure proper schema structure.

**Incorrect (plain objects):**

```typescript
// ❌ No type checking, no autocompletion, easy to make mistakes
export const article = {
  name: 'article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    }
  ]
}
```

**Correct (with define helpers):**

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        // ALWAYS use defineArrayMember for array items
        defineArrayMember({ 
          type: 'reference', 
          to: [{ type: 'tag' }] 
        })
      ]
    })
  ]
})
```

### Key Rules

| Helper | When to Use |
|--------|-------------|
| `defineType` | Root export of every schema type |
| `defineField` | Every field in a type |
| `defineArrayMember` | Every item in an `of` array |

### Benefits

1. **Type Safety:** TypeScript catches invalid field configurations
2. **Autocompletion:** IDE suggests valid options
3. **Documentation:** Hover for property descriptions
4. **Validation:** Build-time errors for invalid schemas

Reference: [Schemas and Forms](https://www.sanity.io/docs/studio/schemas-and-forms)
