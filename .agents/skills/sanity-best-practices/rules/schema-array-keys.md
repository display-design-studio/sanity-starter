---
title: Use _key for Array Items
description: Always use Sanity's _key as React key prop, never array index
tags: schema, arrays, react, visual-editing
---

## Use _key for Array Items

Every item in a Sanity array automatically gets a `_key` property. Always use `_key` as React's `key` prop—never use array index.

**Incorrect (index keys):**

```typescript
// ❌ Index keys break Visual Editing and cause hydration issues
{items.map((item, index) => (
  <Component key={index} {...item} />
))}
```

**Correct (_key from Sanity):**

```typescript
// ✅ Always use Sanity's _key
{items.map((item) => (
  <Component key={item._key} {...item} />
))}

// ✅ Works for page builder blocks
{content.map((block) => {
  switch (block._type) {
    case 'hero':
      return <Hero key={block._key} {...block} />
    case 'features':
      return <Features key={block._key} {...block} />
    default:
      return null
  }
})}
```

### Why This Matters

| Key Type | React Reconciliation | Visual Editing | Reordering |
|----------|---------------------|----------------|------------|
| `_key` | ✅ Stable | ✅ Works | ✅ Smooth |
| `index` | ❌ Breaks on reorder | ❌ Broken overlays | ❌ Flickers |

### Schema Note

You don't define `_key` in your schema—Sanity auto-generates it for array items. Just ensure you query it and use it in your frontend.

```groq
*[_type == "page"][0]{
  pageBuilder[]{
    _key,  // Always include _key in queries
    _type,
    ...
  }
}
```

Reference: [Visual Editing](https://www.sanity.io/docs/visual-editing/introduction-to-visual-editing)
