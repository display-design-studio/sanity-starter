---
title: Query LQIP for Blur Placeholders
description: Explicitly query asset->metadata.lqip for blur-up loading effects
tags: images, performance, lqip, placeholders
---

## Query LQIP for Blur Placeholders

LQIP (Low Quality Image Placeholder) is **not automatic**. You must explicitly query `asset->metadata.lqip` to enable blur-up loading effects.

**Incorrect (LQIP unavailable):**

```groq
// ❌ No LQIP data - blur placeholder won't work
mainImage {
  asset->{ _id, url },
  alt
}
```

**Correct (with LQIP):**

```groq
// ✅ Full query with LQIP and dimensions
mainImage {
  asset->{
    _id,
    url,
    metadata {
      lqip,                          // Base64 blur placeholder
      dimensions { width, height }   // For aspect ratio
    }
  },
  alt,
  hotspot,
  crop
}
```

### Using LQIP in Next.js

```typescript
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  value: {
    asset: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions?: { width: number; height: number }
      }
    }
    alt?: string
  }
  width?: number
}

export function SanityImage({ value, width = 800 }: SanityImageProps) {
  if (!value?.asset) return null

  const aspectRatio = value.asset.metadata?.dimensions 
    ? value.asset.metadata.dimensions.width / value.asset.metadata.dimensions.height
    : 1.5

  return (
    <Image
      src={urlFor(value).width(width).url()}
      alt={value.alt || ''}
      width={width}
      height={Math.round(width / aspectRatio)}
      // Blur placeholder from LQIP
      placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={value.asset.metadata?.lqip}
    />
  )
}
```

### Without LQIP

If you don't query LQIP, `blurDataURL` will be `undefined` and the placeholder won't work. The image will flash in without the smooth blur-up effect.

Reference: [Image URLs](https://www.sanity.io/docs/apis-and-sdks/image-urls)
