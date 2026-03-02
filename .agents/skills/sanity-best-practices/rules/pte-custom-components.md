---
title: Define Typed Portable Text Components
description: Create a typed components object for blocks, types, marks, and lists
tags: portable-text, components, rich-text, rendering
---

## Define Typed Portable Text Components

Always define a typed `components` object for Portable Text rendering. This handles custom blocks, marks, and styling consistently.

**Incorrect (no custom components):**

```typescript
// ❌ Uses default rendering, custom blocks won't work
import { PortableText } from "next-sanity";

export function Content({ value }) {
  return <PortableText value={value} />
}
```

**Correct (with typed components):**

```typescript
import { PortableText, PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  // 1. Block styles (paragraphs, headings)
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
    ),
  },
  
  // 2. Custom types (non-text blocks)
  types: {
    image: ({ value }) => <SanityImage value={value} />,
    callToAction: ({ value }) => (
      <Button href={value.url}>{value.text}</Button>
    ),
  },

  // 3. Marks (inline annotations)
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    link: ({ children, value }) => {
      // Tip: Use your framework's Link component for internal links (e.g., next/link)
      const rel = !value.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a href={value.href} rel={rel} className="underline text-blue-600">
          {children}
        </a>
      );
    },
  },
  
  // 4. Lists
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6">{children}</ol>,
  },
};

export function Content({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
```

### Component Categories

| Type | Examples | Access Pattern |
|------|----------|----------------|
| `block` | h1, h2, blockquote, normal | `{ children }` |
| `types` | image, video, callToAction | `{ value }` |
| `marks` | link, strong, highlight | `{ children, value }` |
| `list` | bullet, number | `{ children }` |

### Tip: Tailwind Typography

For simple blogs, wrap in a `prose` container instead of styling every block:

```typescript
<div className="prose prose-lg">
  <PortableText value={value} components={components} />
</div>
```

Reference: [Portable Text Editor](https://www.sanity.io/docs/studio/customizing-the-portable-text-editor)
