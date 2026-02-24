---
title: References vs Nested Objects
description: Choose between reference and nested object based on reusability needs
tags: schema, references, objects, content-modeling
---

## References vs Nested Objects

Choose between `reference` and nested `object` based on content reusability and editing requirements.

### Use References When:

```typescript
// ✅ Author is reusable across many posts
defineField({
  name: 'author',
  type: 'reference',
  to: [{ type: 'author' }]
})

// ✅ Categories are shared taxonomy
defineField({
  name: 'categories',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'category' }] }]
})
```

**Reference when:**
- Content is reusable across documents
- Content needs its own editing interface
- You need to query/filter by the related content
- Updates should reflect everywhere (single source of truth)

### Use Nested Objects When:

```typescript
// ✅ SEO is document-specific, not shared
defineField({
  name: 'seo',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' })
  ]
})

// ✅ Hero content is page-specific
defineField({
  name: 'hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', type: 'string' }),
    defineField({ name: 'image', type: 'image' })
  ]
})
```

**Object when:**
- Content is specific to this document
- Content doesn't make sense on its own
- You want simpler editing (all fields in one place)
- You need data to be copied, not linked

### Quick Decision Matrix

| Scenario | Use |
|----------|-----|
| Blog post author | `reference` (reusable) |
| Product category | `reference` (shared taxonomy) |
| Page SEO fields | `object` (page-specific) |
| Hero section | `object` (page-specific) |
| Team member on About | `reference` (might be used elsewhere) |
| CTA button | `object` (usually page-specific) |

### Query Differences

```groq
// Reference requires expansion with ->
*[_type == "post"]{ author->{ name, bio } }

// Object is already inline
*[_type == "post"]{ seo { title, description } }
```

Reference: [Schemas and Forms](https://www.sanity.io/docs/studio/schemas-and-forms)
