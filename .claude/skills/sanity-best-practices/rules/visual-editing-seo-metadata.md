---
title: Never Allow Stega in Metadata
description: Disable stega or clean values for title, description, and canonical URLs
tags: visual-editing, seo, metadata, stega
---

## Never Allow Stega in Metadata

**NEVER** allow Stega strings in `<head>` tags (title, description, canonical URLs). Invisible characters destroy SEO rankings and look broken in search results.

**Incorrect (stega in metadata):**

```typescript
// ❌ Stega characters in title tag will show garbled text in search results
export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    // Missing stega: false!
  })
  return { 
    title: data.title, // Contains hidden characters
    description: data.description 
  }
}
```

**Correct (disable stega for metadata):**

```typescript
// Next.js Example
export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({
    query: SEO_QUERY,
    stega: false  // 👈 CRITICAL - disable stega for metadata
  })
  
  return { 
    title: data.title,
    description: data.description
  }
}
```

### Alternative: Clean Explicitly

If you can't disable stega at the fetch level:

```typescript
import { stegaClean } from "@sanity/client/stega";

export async function generateMetadata({ params }) {
  const { data } = await sanityFetch({ query: PAGE_QUERY })
  
  return { 
    title: stegaClean(data.title),
    description: stegaClean(data.description),
    openGraph: {
      url: stegaClean(data.canonicalUrl)
    }
  }
}
```

### What Happens Without This

| Field | With Stega | Search Result Display |
|-------|------------|----------------------|
| Title | `My Page​‌‍​` | `My Page` (invisible chars) |
| Description | `About us​‌‍​` | Truncated/garbled text |
| Canonical URL | `example.com/page​‌‍​` | 404 or wrong page |

Reference: [Visual Editing](https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing)
