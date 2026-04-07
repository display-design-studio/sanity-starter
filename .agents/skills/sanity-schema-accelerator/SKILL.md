---
name: sanity-schema-accelerator
description: >-
  Fast Sanity schema generation skill for low-token output. Generates ready-to-paste
  TypeScript schema files for object blocks, pageBuilder arrays, singleton pages,
  and repeatable pages using defineType and defineField conventions. Use when the
  user asks to create a Sanity schema, page builder block, singleton (home/about),
  or repeatable page with localeString/localeSlug. Starter-aware: updates
  schemaTypes index and singleton structure registration files.
---

# Sanity Schema Accelerator

Low-verbosity generator for Sanity schema boilerplates.

## ROUTING: Which rule file to load

**IF user asks "creami un componente per il pageBuilder" or asks for a block/object schema:**
→ Read `rules/core-object-block-template.md`

**IF user asks to define or update the page builder array type:**
→ Read `rules/core-page-builder-template.md`

**IF user asks "crea la pagina stile home", "singleton", or one fixed page document:**
→ Read `rules/core-singleton-template.md`

**IF using display-design-studio/sanity-starter (default for this skill):**
→ Read `rules/core-starter-registration-workflow.md`

**IF user asks "creami una pagina about" (repeatable document with slug):**
→ Read `rules/core-repeatable-page-template.md`

**IF user asks for shortest possible output or token-efficient responses:**
→ Read `rules/perf-low-token-output.md`

**IF schema fails with missing imports/types/groups/preview errors:**
→ Read `rules/debug-schema-checklist.md`

## Output contract (default)

- Return only final code in one `ts` block.
- No long explanations unless explicitly requested.
- Ask at most one question only if a required value is missing.
- Prefer safe defaults from these conventions:
  - `groups: baseGroups`
  - singleton: `pageBuilder` + `seo`
  - repeatable page: `title` + `slug` + `pageBuilder` + `seo`
  - block schema preview title fixed to schema title

## Starter registration defaults (display-design-studio/sanity-starter)

- Any new schema type must be imported and registered in `schemaTypes/index.ts`.
- Any new singleton must also be added to `singletonTypes` in `sanity.config.ts`.
- Any new singleton must also generate/update desk structure files under `structure/`:
  - create `structure/<singleton>.ts`
  - wire it in `structure/index.ts`

## Rule index

| Topic | File |
|---|---|
| Sections overview | `rules/_sections.md` |
| Object block template | `rules/core-object-block-template.md` |
| Page builder array template | `rules/core-page-builder-template.md` |
| Singleton document template | `rules/core-singleton-template.md` |
| Repeatable page document template | `rules/core-repeatable-page-template.md` |
| Starter registration workflow | `rules/core-starter-registration-workflow.md` |
| Token-saving output mode | `rules/perf-low-token-output.md` |
| Troubleshooting checklist | `rules/debug-schema-checklist.md` |
