# Sanity Schema Accelerator Sections

This skill is optimized for speed and low token usage when generating schema files.

## 1) Core (`core-`)

- `core-object-block-template.md` - Generate a page builder block (`type: 'object'`)
- `core-page-builder-template.md` - Generate the `pageBuilder` array type
- `core-singleton-template.md` - Generate singleton document schemas (home/about singleton)
- `core-repeatable-page-template.md` - Generate repeatable page schemas with localized title/slug
- `core-starter-registration-workflow.md` - Register schemas in starter files (`schemaTypes`, `sanity.config.ts`, `structure/`)

## 2) Performance (`perf-`)

- `perf-low-token-output.md` - Minimal response contract and defaults

## 3) Debug (`debug-`)

- `debug-schema-checklist.md` - Fast checks for imports, type names, groups, and preview

## Suggested read order

1. `perf-low-token-output.md`
2. One core template for the requested schema type
3. `debug-schema-checklist.md` if there are compile/runtime schema errors
