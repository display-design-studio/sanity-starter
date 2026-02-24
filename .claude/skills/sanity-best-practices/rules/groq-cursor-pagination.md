---
title: Use Cursor-Based Pagination
description: Use cursor-based pagination instead of deep offsets for consistent performance
tags: groq, performance, pagination, scaling
---

## Use Cursor-Based Pagination

Deep slice offsets are slow because all skipped documents must be sorted first. Cursor-based pagination fetches only the documents needed.

**Incorrect (offset-based, gets slower with depth):**

```groq
// Page 1: Fast
*[_type == "article"] | order(_id)[0...20]

// Page 500: SLOW - must sort and skip 10,000 docs first
*[_type == "article"] | order(_id)[10000...10020]
```

**Correct (cursor-based, constant time):**

```groq
// Page 1: Start from beginning
*[_type == "article"] | order(_id)[0...20]

// Page 500: Start from last seen ID - only fetches 20 docs
*[_type == "article" && _id > $lastId] | order(_id)[0...20]
```

### Implementation Pattern

```typescript
// First page
const firstPage = await client.fetch(
  `*[_type == "article"] | order(_id)[0...20]`
)

// Get cursor from last item
const lastId = firstPage[firstPage.length - 1]._id

// Next page using cursor
const nextPage = await client.fetch(
  `*[_type == "article" && _id > $lastId] | order(_id)[0...20]`,
  { lastId }
)
```

### For Custom Sort Orders

When ordering by a field other than `_id`, include it in the cursor:

```groq
// Order by publishedAt, use as cursor
*[_type == "article" && (
  publishedAt < $lastDate || 
  (publishedAt == $lastDate && _id > $lastId)
)] | order(publishedAt desc, _id)[0...20]
```

Reference: [High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq)
