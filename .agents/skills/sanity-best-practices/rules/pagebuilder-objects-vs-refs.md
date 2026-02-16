---
title: Objects vs References in Page Builders
description: Default to objects for blocks; use references only for truly shared content
tags: page-builder, schema, references, objects
---

## Objects vs References in Page Builders

Most page builder blocks should be **objects**, not references. Use references sparingly for content that's truly shared across many pages.

**Incorrect (overusing references):**

```typescript
// ❌ Every block is a reference - overcomplicated
defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    { type: 'reference', to: [{ type: 'heroBlock' }] },
    { type: 'reference', to: [{ type: 'featuresBlock' }] },
    { type: 'reference', to: [{ type: 'ctaBlock' }] },
  ]
})
```

**Correct (objects by default):**

```typescript
// ✅ Blocks are objects - simple, page-specific
defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'features' }),
    defineArrayMember({ type: 'cta' }),
    // Reference only for truly shared content
    defineArrayMember({ 
      type: 'reference', 
      to: [{ type: 'testimonial' }],
      title: 'Shared Testimonial'
    }),
  ]
})
```

### Decision Matrix

| Use Objects | Use References |
|-------------|----------------|
| Content unique to this page | Content reused across many pages |
| Simpler queries | Needs central management |
| Default choice | FAQs, testimonials, reusable CTAs |

### Query Differences

```groq
// Objects - already inline
*[_type == "page"][0]{
  pageBuilder[]{ ... }
}

// References - need expansion
*[_type == "page"][0]{
  pageBuilder[]{
    ...,
    _type == "reference" => @->{ ... }
  }
}
```

Reference: [Page Building Guide](https://www.sanity.io/docs/developer-guides/how-to-use-structured-content-for-page-building)
