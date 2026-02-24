---
title: Project Only Needed Fields
description: Use projections to return only the fields your application needs
tags: groq, performance, projections, optimization
---

## Project Only Needed Fields

Always use projections to return only the fields your application needs. Fetching entire documents wastes bandwidth and processing time.

**Incorrect (fetches everything):**

```groq
// Returns ALL fields including unused ones, metadata, revisions
*[_type == "post"]

// Spread without filtering still includes extra fields
*[_type == "post"]{...}
```

**Correct (explicit projection):**

```groq
// Only fetch what the component needs
*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}

// For a card component - minimal data
*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url
}[0...10]
```

### Nested Projections

Apply projections at every level:

```groq
*[_type == "post"]{
  title,
  // Don't just do: author->
  // Project the author fields you need:
  author->{ name, "avatar": image.asset->url },
  // Same for arrays:
  categories[]->{ title, "slug": slug.current }
}
```

### Dynamic Field Selection

Use conditional projections for different contexts:

```groq
*[_type == "post"]{
  title,
  slug,
  // Only include body for single post view
  $includeBody == true => { body }
}
```

Reference: [GROQ Query Language](https://www.sanity.io/docs/content-lake/how-queries-work)
