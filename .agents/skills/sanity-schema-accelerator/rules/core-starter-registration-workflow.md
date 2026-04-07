# Starter Registration Workflow

Use this workflow by default for `display-design-studio/sanity-starter`.

## Goal

When generating schemas, include the required registration updates so the schema is usable immediately.

## Mandatory steps

### 1) Create schema file

- Create the requested schema in `schemaTypes/documents/` or `schemaTypes/custom-types/`.
- Use the closest template from this skill (`singleton`, `repeatable`, `object block`, `pageBuilder`).

### 2) Register in `schemaTypes/index.ts`

- Add import for the new schema export.
- Add type to `documents` or `types` array.
- Keep export order stable and readable.

Example pattern:

```ts
//Documents
import { home } from './documents/home'
import { page } from './documents/page'
import { about } from './documents/about'

const documents = [home, page, about]
```

### 3) Singleton only: register in `sanity.config.ts`

- Add singleton schema type to `singletonTypes` set.
- Keep `singletonActions` unchanged unless explicitly requested.

Example pattern:

```ts
const singletonTypes = new Set(['home', 'about'])
```

### 4) Singleton only: generate desk structure wiring in `structure/`

- Create `structure/<singleton>.ts` using `home.ts` pattern.
- Import and mount the new structure item in `structure/index.ts`.

Example `structure/about.ts`:

```ts
import { StructureBuilder } from 'sanity/structure'

export const about = (S: StructureBuilder) =>
  S.listItem()
    .id('about')
    .schemaType('about')
    .title('About')
    .child(S.editor().id('about').schemaType('about').documentId('about'))
```

Example `structure/index.ts` update:

```ts
import { StructureBuilder } from 'sanity/structure'
import { home } from './home'
import { about } from './about'
import { pages } from './pages'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([home(S), about(S), pages(S)])
```

## Output contract for starter requests

Return one `ts` code block per touched file in this order:

1. New schema file
2. `schemaTypes/index.ts`
3. `sanity.config.ts` (singleton only)
4. `structure/<singleton>.ts` (singleton only)
5. `structure/index.ts` (singleton only)
