---
title: Order Before Slice
description: Apply order() before slice notation to get correct results
tags: groq, performance, ordering, slicing
---

## Order Before Slice

Always apply `order()` before slice notation. Slicing before ordering returns arbitrary results and prevents query optimization.

**Incorrect (slice then order):**

```groq
// Wrong: Slices 10 arbitrary docs, THEN sorts them
*[_type == "post"][0...10] | order(publishedAt desc)

// You get 10 random posts sorted among themselves,
// not the 10 most recent posts
```

**Correct (order then slice):**

```groq
// Correct: Sorts ALL posts by date, THEN takes first 10
*[_type == "post"] | order(publishedAt desc)[0...10]

// You get the 10 most recent posts
```

### Multiple Sort Fields

Use multiple fields for deterministic ordering (tiebreaker):

```groq
// Primary: featured status, Secondary: date, Tertiary: _id
*[_type == "post"] | order(featured desc, publishedAt desc, _id)[0...10]
```

### Common Patterns

```groq
// Latest posts
*[_type == "post"] | order(publishedAt desc)[0...10]

// Alphabetical listing
*[_type == "author"] | order(name asc)[0...50]

// Single document (most recent)
*[_type == "post"] | order(publishedAt desc)[0]
```

Reference: [GROQ Query Language](https://www.sanity.io/docs/content-lake/how-queries-work)
