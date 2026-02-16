---
title: Avoid Joins in Filters
description: Use _ref for direct comparison instead of -> which resolves references for every document
tags: groq, performance, references, joins
---

## Avoid Joins in Filters

Reference resolution (`->`) in filters is expensive because it must resolve the reference for every document being filtered. Use `_ref` for direct comparison instead.

**Incorrect (resolves reference for every document):**

```groq
// Slow: Must fetch and check author document for EVERY post
*[_type == "post" && author->name == "Bob Woodward"]

// Slow: Nested reference resolution in filter
*[_type == "comment" && post->author->_id == $authorId]
```

**Correct (direct _ref comparison):**

```groq
// Fast: Direct string comparison, uses index
*[_type == "post" && author._ref == "author-bob-woodward-id"]

// If you need to filter by author name, do it in two steps:
// 1. First, get the author ID
// 2. Then filter posts by that ID
```

### When You Need Dynamic Lookups

If you must filter by a referenced document's field value:

```groq
// Step 1: Get the reference ID first
*[_type == "author" && name == "Bob Woodward"][0]._id

// Step 2: Use that ID in your main query
*[_type == "post" && author._ref == $authorId]
```

Or use a subquery (still better than `->` in filter):

```groq
*[_type == "post" && author._ref in *[_type == "author" && name == "Bob Woodward"]._id]
```

Reference: [High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq)
