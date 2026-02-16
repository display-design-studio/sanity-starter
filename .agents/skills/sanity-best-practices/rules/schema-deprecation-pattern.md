---
title: Safe Field Deprecation Pattern
description: Never delete fields with data - use the ReadOnly → Hidden → Deprecated lifecycle
tags: schema, migration, deprecation, safety
---

## Safe Field Deprecation Pattern

**NEVER** delete a field that contains production data. It causes data loss or Studio crashes. Instead, follow the ReadOnly → Hidden → Deprecated lifecycle.

**Incorrect (dangerous):**

```typescript
// ❌ NEVER do this - deleting a field with existing data
// Data is lost, Studio may crash trying to render it
defineType({
  name: 'article',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    // Deleted: defineField({ name: 'oldTitle', type: 'string' }),
  ]
})
```

**Correct (safe deprecation):**

```typescript
defineField({
  name: 'oldTitle',
  title: 'Article Title (Deprecated)',
  type: 'string',
  // 1. Show deprecation warning with reason
  deprecated: {
    reason: 'Use the new "seoTitle" field instead. Will be removed in v2.'
  },
  // 2. Prevent new edits
  readOnly: true,
  // 3. Hide from NEW documents (where value is undefined)
  hidden: ({ value }) => value === undefined,
  // 4. Ensure new documents don't get this field
  initialValue: undefined
})
```

### Migration Workflow

**Phase 1: Deprecate**
1. Apply the deprecation pattern above
2. Deploy schema changes

**Phase 2: Migrate**
1. Update frontend to use new fields (with fallbacks using `coalesce()`)
2. Create a migration file in `migrations/` folder:

```typescript
// migrations/rename-oldTitle-to-newTitle/index.ts
import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Rename oldTitle to newTitle',
  documentTypes: ['article'],
  filter: 'defined(oldTitle) && !defined(newTitle)',
  migrate: {
    document(doc) {
      return [
        at('newTitle', setIfMissing(doc.oldTitle)),
        at('oldTitle', unset())
      ]
    }
  }
})
```

3. Run the migration:

```bash
# Dry run first (default)
sanity migration run rename-oldTitle-to-newTitle

# Execute when ready
sanity migration run rename-oldTitle-to-newTitle --no-dry-run
```

**Phase 3: Remove**
1. Verify `oldTitle` is undefined for all documents
2. Delete the field definition from schema

Reference: [Schema and Content Migrations](https://www.sanity.io/docs/content-lake/schema-and-content-migrations)
