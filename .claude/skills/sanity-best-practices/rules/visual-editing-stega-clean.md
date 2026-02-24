---
title: Clean Stega for Logic Operations
description: Use stegaClean() before string comparisons or object key lookups
tags: visual-editing, stega, content-source-maps, best-practices
---

## Clean Stega for Logic Operations

When Visual Editing is enabled, string fields contain invisible Stega characters for click-to-edit functionality. You **MUST** clean them before using values for logic.

**Incorrect (stega breaks logic):**

```typescript
// ❌ Stega characters cause comparison to fail
function Layout({ align }: { align: string }) {
  // This will NEVER be true because align contains hidden characters
  if (align === 'center') {
    return <div className="mx-auto">...</div>
  }
}

// ❌ Object key lookup fails
const colors = { red: 'bg-red-500', blue: 'bg-blue-500' }
const className = colors[color] // undefined - key doesn't match
```

**Correct (clean before logic):**

```typescript
import { stegaClean } from "@sanity/client/stega";

function Layout({ align }: { align: string }) {
  // ✅ Clean before comparison
  const cleanAlign = stegaClean(align);
  return (
    <div className={cleanAlign === 'center' ? 'mx-auto' : ''}>
      ...
    </div>
  )
}

// ✅ Clean before object key lookup
const colors = { red: 'bg-red-500', blue: 'bg-blue-500' }
const className = colors[stegaClean(color)]
```

### When to Clean

| Scenario | Clean? | Why |
|----------|--------|-----|
| Comparing strings (`if (x === 'y')`) | ✅ Yes | Stega breaks equality |
| Using as object keys | ✅ Yes | Keys won't match |
| Using as HTML IDs | ✅ Yes | Invalid characters |
| Passing to third-party libraries | ✅ Yes | May validate input |
| Rendering text (`<h1>{title}</h1>`) | ❌ No | Breaks click-to-edit |
| Passing to `<PortableText />` | ❌ No | Handles internally |
| Passing to image helpers | ❌ No | Handles internally |

### Next.js Specific

Import from `next-sanity` for convenience:

```typescript
import { stegaClean } from "next-sanity";
```

Reference: [Visual Editing](https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing)
