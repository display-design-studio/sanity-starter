---
title: Configure Presentation Tool Correctly
description: Setup for click-to-edit overlays and document location navigation
tags: visual-editing, presentation-tool, studio, configuration
---

## Configure Presentation Tool Correctly

The Presentation Tool renders your frontend inside Studio, enabling click-to-edit overlays and navigation between documents and their preview locations.

### Basic Setup

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { resolve } from '@/sanity/presentation/resolve'

export default defineConfig({
  // ...
  plugins: [
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})
```

### Document Locations Resolver

Define where documents appear in the frontend for quick navigation:

```typescript
// src/sanity/presentation/resolve.ts
import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/posts/${doc?.slug}` },
          { title: 'Posts index', href: `/posts` },
        ],
      }),
    }),
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/${doc?.slug}` },
        ],
      }),
    }),
  },
}
```

### Visual Editing Component (Next.js)

Render overlays in Draft Mode:

```typescript
// app/layout.tsx
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
```

### Token Security

Store tokens securely, never expose in client bundles:

```typescript
// src/sanity/lib/token.ts
export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}
```

Reference: [Presentation Tool](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool)
