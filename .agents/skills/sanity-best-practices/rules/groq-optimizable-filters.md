---
title: Use Optimizable Filters First
description: Stack optimizable filters first to leverage indexes and avoid full dataset scans
tags: groq, performance, indexes, query-optimization
---

## Use Optimizable Filters First

GROQ uses indexes for **optimizable** filters. Non-optimizable filters scan ALL documents, causing severe performance degradation on large datasets.

**Incorrect (scans everything):**

```groq
// Comparing two attributes - cannot use index
*[salePrice < displayPrice]

// Join in filter - expensive reference resolution
*[author->name == "Bob Woodward"]
```

**Correct (uses indexes):**

```groq
// Stack optimizable filters FIRST to reduce search space
*[_type == "product" && defined(salePrice) && salePrice < displayPrice]

// Use _ref for direct comparison (no resolution needed)
*[_type == "post" && author._ref == "author-bob-woodward-id"]
```

### Optimizable Filter Patterns

| Pattern | Optimizable | Example |
|---------|-------------|---------|
| `_type == "x"` | ✅ Yes | `*[_type == "post"]` |
| `_id == "x"` | ✅ Yes | `*[_id == "abc123"]` |
| `slug.current == $slug` | ✅ Yes | `*[slug.current == "hello"]` |
| `defined(field)` | ✅ Yes | `*[defined(publishedAt)]` |
| `references($id)` | ✅ Yes | `*[references("author-123")]` |
| `field->attr == x` | ❌ No | Resolves reference for every doc |
| `fieldA < fieldB` | ❌ No | Compares two attributes |

Reference: [High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq)
