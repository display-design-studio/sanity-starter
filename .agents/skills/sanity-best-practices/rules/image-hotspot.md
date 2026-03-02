---
title: Always Enable Image Hotspots
description: Enable hotspot:true for editor-controlled cropping and focal points
tags: images, schema, editor-experience, cropping
---

## Always Enable Image Hotspots

Always enable `hotspot: true` on image fields. This allows editors to control cropping and set the focal point, ensuring the important part of images is always visible.

**Incorrect (no hotspot):**

```typescript
// ❌ Editors can't control cropping - faces may get cut off
defineField({
  name: 'mainImage',
  type: 'image'
})
```

**Correct (with hotspot):**

```typescript
defineField({
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: { 
    hotspot: true  // 👈 CRITICAL
  }
})
```

### Why This Matters

| Aspect Ratio | Without Hotspot | With Hotspot |
|--------------|-----------------|--------------|
| Square crop | May cut off subject | Focuses on hotspot |
| Wide banner | Random center crop | Editor-defined focus |
| Mobile portrait | Unpredictable | Always shows key area |

### Using Hotspot in URL Builder

```typescript
import { urlFor } from '@/sanity/lib/image'

// The URL builder automatically uses hotspot/crop data
const imageUrl = urlFor(mainImage)
  .width(800)
  .height(600)
  .fit('crop')  // Respects hotspot when cropping
  .url()
```

### Query the Hotspot Data

Include hotspot and crop data when needed for advanced layouts:

```groq
mainImage {
  asset->{ _id, url },
  alt,
  hotspot,  // { x, y, width, height }
  crop      // { top, bottom, left, right }
}
```

Reference: [Image URLs](https://www.sanity.io/docs/apis-and-sdks/image-urls)
