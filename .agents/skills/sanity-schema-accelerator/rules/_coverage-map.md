# Sanity Schema Accelerator Coverage Map

Source conventions: Display Studio project schema patterns provided by user.

## Covered templates

- Object block template (`type: 'object'`) with fixed preview title
  -> `core-object-block-template.md`
- Page builder array template with list/grid insert menu and preview image path
  -> `core-page-builder-template.md`
- Singleton document template using `baseGroups` and `languageFilter`
  -> `core-singleton-template.md`
- Repeatable page template using `localeString`, `localeSlug`, `baseLanguage`
  -> `core-repeatable-page-template.md`

## Starter registration workflow

- Register every new schema in `schemaTypes/index.ts`
  -> `core-starter-registration-workflow.md`
- Register singleton types in `sanity.config.ts` (`singletonTypes`)
  -> `core-starter-registration-workflow.md`
- Generate and wire singleton desk structure in `structure/<name>.ts` and `structure/index.ts`
  -> `core-starter-registration-workflow.md`

## Output style

- Minimal response contract for token efficiency
  -> `perf-low-token-output.md`

## Error handling

- Missing imports, missing type registration, preview/group mismatches
  -> `debug-schema-checklist.md`

## Scope boundaries

- This skill focuses on schema code generation only.
- For broad Sanity architecture, GROQ, Visual Editing, and TypeGen workflows,
  use `skills/sanity-best-practices`.
