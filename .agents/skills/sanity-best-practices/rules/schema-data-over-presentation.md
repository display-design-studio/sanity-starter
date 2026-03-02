---
title: Model Data, Not Presentation
description: Model what things ARE, not what they look like - enables content reuse across channels
tags: schema, content-modeling, best-practices, architecture
---

## Model Data, Not Presentation

Model **what things are**, not **what they look like**. Presentation-focused schemas couple content to specific designs and limit reuse across channels.

**Incorrect (presentation-focused):**

```typescript
// ❌ Field names describe appearance, not meaning
defineField({ name: 'bigHeroText', type: 'string' })
defineField({ name: 'redButton', type: 'object', ... })
defineField({ name: 'threeColumnRow', type: 'array', ... })
defineField({ name: 'fontSize', type: 'number' })
defineField({ name: 'color', type: 'string' })
```

**Correct (data-focused):**

```typescript
// ✅ Field names describe what the content IS
defineField({ name: 'heroStatement', type: 'string' })
defineField({ name: 'callToAction', type: 'object', ... })
defineField({ name: 'features', type: 'array', ... })
defineField({ name: 'status', type: 'string', options: { list: ['draft', 'published'] } })
defineField({ name: 'role', type: 'string', options: { list: ['admin', 'editor'] } })
```

### Why This Matters

| Presentation-Focused | Data-Focused | Benefit |
|---------------------|--------------|---------|
| `bigHeroText` | `headline` | Works in any layout |
| `redButton` | `primaryAction` | Design can change |
| `leftSidebar` | `relatedContent` | Position is frontend concern |
| `mobileImage` | `image` (with crops) | Single source, responsive |

### The Test

Ask: "If we redesigned the site, would this field name still make sense?"

- `threeColumnLayout` → ❌ Fails (what if we go to 2 columns?)
- `features` → ✅ Passes (features are features regardless of layout)

Reference: [Content Modeling](https://www.sanity.io/content-modeling)
