---
title: Always Use defineQuery
description: Wrap GROQ queries in defineQuery for TypeGen support and type safety
tags: groq, typescript, typegen, best-practices
---

## Always Use defineQuery

Wrap all GROQ queries in `defineQuery` for TypeGen support. This enables automatic TypeScript type generation from your queries.

**Incorrect (no type generation):**

```typescript
// No TypeGen support, result is `any`
const query = `*[_type == "post"]{ title, slug }`
const posts = await client.fetch(query)
// posts: any
```

**Correct (with defineQuery):**

```typescript
import { defineQuery } from "groq";
// Or for Next.js: import { defineQuery } from "next-sanity";

// TypeGen generates POST_QUERYResult type automatically
const POST_QUERY = defineQuery(`*[_type == "post"]{ title, slug }`)

// After running `npm run typegen`:
import type { POST_QUERYResult } from "@/sanity/types"

const posts: POST_QUERYResult = await client.fetch(POST_QUERY)
// posts is fully typed!
```

### Syntax Highlighting

For VS Code syntax highlighting, use one of these patterns:

```typescript
// Option A: groq tagged template (provides highlighting)
import groq from "groq";
const QUERY = defineQuery(groq`*[_type == "post"]`);

// Option B: Comment prefix (for plain template literals)
const QUERY = defineQuery(/* groq */ `*[_type == "post"]`);
```

### Query Fragments

Use string interpolation to reuse query logic:

```typescript
const imageFragment = /* groq */ `
  asset->{ _id, url, metadata { lqip, dimensions } },
  alt
`;

const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post"][0] {
    title,
    mainImage { ${imageFragment} }
  }
`);
```

Reference: [Sanity TypeGen](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen)
