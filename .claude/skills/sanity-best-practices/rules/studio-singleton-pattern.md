---
title: Implement Singletons via Structure
description: Singletons use fixed documentId in Structure, not schema options
tags: studio, structure, singletons, configuration
---

## Implement Singletons via Structure

Singletons (site settings, homepage) are enforced via **Structure**, not schema. There is no `singleton: true` schema option.

**Incorrect (no such option):**

```typescript
// ❌ This doesn't exist
defineType({
  name: 'settings',
  type: 'document',
  singleton: true,  // Not a thing!
})
```

**Correct (via Structure):**

```typescript
// 1. Normal schema definition
defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [/* ... */]
})

// 2. Structure with fixed documentId
// src/structure/index.ts
const SINGLETONS = ['settings', 'homePage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton with fixed ID
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')  // Fixed ID = singleton
        ),
      
      S.divider(),

      // Filter singletons from generic lists
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() as string)
      )
    ])
```

### Helper Function

```typescript
function createSingleton(
  S: StructureBuilder, 
  typeName: string, 
  title: string, 
  icon?: ComponentType
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title)
    )
}

// Usage
createSingleton(S, 'settings', 'Site Settings', CogIcon)
```

### Querying Singletons

```groq
// By fixed ID (most efficient)
*[_id == "settings"][0]

// By type (works but slower)
*[_type == "settings"][0]
```

Reference: [Studio Structure](https://www.sanity.io/docs/studio/structure-builder-introduction)
