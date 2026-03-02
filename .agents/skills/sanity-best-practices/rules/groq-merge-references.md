---
title: Merge Repeated Reference Resolutions
description: Combine multiple -> calls to the same reference into a single subquery
tags: groq, performance, references, projections
---

## Merge Repeated Reference Resolutions

Each `->` operator triggers a separate subquery. Repeating the same reference resolution multiple times wastes resources. Merge them into a single resolution.

**Incorrect (multiple subqueries for same reference):**

```groq
// Two separate subqueries to the same parent document
*[_type == "category"]{
  "parentTitle": parent->title,
  "parentSlug": parent->slug.current
}

// Three subqueries to author
*[_type == "post"]{
  "authorName": author->name,
  "authorBio": author->bio,
  "authorImage": author->image
}
```

**Correct (single subquery, merged):**

```groq
// Single subquery, fields merged into result
*[_type == "category"]{
  ...(parent->{ "parentTitle": title, "parentSlug": slug.current })
}

// Single author resolution
*[_type == "post"]{
  author->{ name, bio, image }
}
```

### The Merge Pattern

Use the spread operator (`...`) with parentheses to merge resolved fields directly into your projection:

```groq
*[_type == "product"]{
  title,
  price,
  // Merge category fields directly into product
  ...(category->{ 
    "categoryName": name, 
    "categorySlug": slug.current 
  })
}

// Result: { title, price, categoryName, categorySlug }
```

Reference: [High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq)
