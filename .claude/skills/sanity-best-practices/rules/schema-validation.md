---
title: Use Validation Effectively
description: Beyond rule.required() - patterns for email, URL, cross-field, and async validation
tags: schema, validation, content-quality, best-practices
---

## Use Validation Effectively

Sanity offers powerful validation beyond `rule.required()`. Use validation to ensure content quality and prevent invalid data.

### Common Patterns

```typescript
// Email validation
defineField({
  name: 'email',
  type: 'string',
  validation: (rule) => rule.email().required()
})

// URL validation with custom message
defineField({
  name: 'website',
  type: 'url',
  validation: (rule) => rule.uri({
    scheme: ['http', 'https']
  }).error('Must be a valid URL starting with http:// or https://')
})

// Length constraints with warning (not error)
defineField({
  name: 'excerpt',
  type: 'text',
  validation: (rule) => rule.max(200).warning('Keep under 200 chars for best SEO')
})

// Regex pattern for slugs
defineField({
  name: 'slug',
  type: 'slug',
  validation: (rule) => rule.required().custom((slug) => {
    if (!slug?.current) return 'Required'
    if (!/^[a-z0-9-]+$/.test(slug.current)) {
      return 'Slug must be lowercase with hyphens only'
    }
    return true
  })
})
```

### Cross-Field Validation

```typescript
defineField({
  name: 'endDate',
  type: 'datetime',
  validation: (rule) => rule.custom((endDate, context) => {
    const startDate = context.document?.startDate
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return 'End date must be after start date'
    }
    return true
  })
})
```

### Array Validation

```typescript
defineField({
  name: 'tags',
  type: 'array',
  of: [{ type: 'string' }],
  validation: (rule) => rule
    .min(1).error('Add at least one tag')
    .max(10).warning('Too many tags may hurt SEO')
    .unique()
})
```

### Async Validation (Uniqueness)

```typescript
defineField({
  name: 'slug',
  type: 'slug',
  validation: (rule) => rule.required().custom(async (slug, context) => {
    if (!slug?.current) return true
    
    const client = context.getClient({ apiVersion: '2024-01-01' })
    const id = context.document?._id?.replace(/^drafts\./, '')
    
    const existing = await client.fetch(
      `count(*[_type == "post" && slug.current == $slug && _id != $id])`,
      { slug: slug.current, id }
    )
    
    return existing === 0 || 'Slug already exists'
  })
})
```

Reference: [Validation](https://www.sanity.io/docs/studio/validation)
