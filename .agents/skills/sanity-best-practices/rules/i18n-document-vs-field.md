---
title: Choose Document vs Field-Level Localization
description: Document-level for presentation content, field-level for structured data
tags: localization, i18n, internationalization, content-modeling
---

## Choose Document vs Field-Level Localization

Choose your localization method based on content type. Wrong choice leads to awkward editing or complex queries.

### Document-Level Localization

One document per language. Use for **presentation content** (pages, posts).

```typescript
// Plugin: @sanity/document-internationalization
import { documentInternationalization } from '@sanity/document-internationalization'

export default defineConfig({
  plugins: [
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'French' },
      ],
      schemaTypes: ['post', 'page'],
    }),
  ],
})
```

**Query:**
```groq
*[_type == "post" && language == $locale && slug.current == $slug][0]
```

**When to use:**
- Content is mostly different per language
- Need independent publishing per locale
- Pages, posts, marketing content

### Field-Level Localization

One document, localized fields. Use for **structured data** (products, people).

```typescript
// Plugin: sanity-plugin-internationalized-array
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

export default defineConfig({
  plugins: [
    internationalizedArray({
      languages: [
        { id: 'en', title: 'English' },
        { id: 'fr', title: 'French' },
      ],
      fieldTypes: ['string', 'text'],
    }),
  ],
})

// Schema
defineField({
  name: 'jobTitle',
  type: 'internationalizedArrayString',
})
```

**Query:**
```groq
*[_type == "author"][0]{
  "jobTitle": jobTitle[_key == $locale][0].value
}
```

**When to use:**
- Most fields shared across languages
- Changes should be "global" (reordering, structure)
- Products, people, categories

### Decision Matrix

| Question | Yes → | No → |
|----------|-------|------|
| Publish languages independently? | Document | Field |
| Content mostly different per locale? | Document | Field |
| Need global structure changes? | Field | Document |

Reference: [Localization Guide](https://www.sanity.io/docs/studio/localization)
