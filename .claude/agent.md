# Sanity Starter Template

## Overview

A Sanity Studio starter template with built-in internationalization (i18n) support.

## Tech Stack

- **Sanity Studio** v5.9+
- **React** 19
- **TypeScript** 5.9+
- **Bun** (package manager)

## Project Structure

```
schemaTypes/
├── documents/           # Document types (home, page)
│   ├── home.ts          # Singleton homepage
│   └── page.ts          # Regular pages
├── custom-types/        # Locale field types
│   ├── localeString.ts
│   ├── localeText.ts
│   ├── localeBlock.ts
│   └── localeSlug.ts
└── index.ts

structure/               # Studio desk structure
├── index.ts             # Main structure export
├── home.ts              # Home singleton config
└── pages.ts             # Pages list config

utils/
├── env.ts               # Environment variables
└── localization.ts      # Supported languages config

presentation/            # Visual editing resolver
└── resolve.ts
```

## Key Patterns

### Internationalization (i18n)

This project uses custom locale types for field-level translations:

- `localeString` - Localized text field
- `localeText` - Localized textarea
- `localeBlock` - Localized Portable Text
- `localeSlug` - Localized URL slug

Languages configured in `utils/localization.ts`:

- English (default)
- Italian

### Singleton Documents

Documents like `home` are singletons (one instance only).
Configured via `singletonTypes` Set in `sanity.config.ts`.

### Preview

Document previews use `baseLanguage.id` for title display:

```ts
preview: {
  select: {
    title: `title.${baseLanguage.id}`
  }
}
```

## Commands

```bash
bun dev                 # Start development server
bun run build           # Build for production
bun run generate-types  # Generate TypeScript types
bun run deploy          # Deploy to Sanity
```

## Code Conventions

- **Prettier**: no semicolons, single quotes, 100 char width
- **Imports**: use `defineType`, `defineField` from 'sanity'
- **File naming**: kebab-case for files, PascalCase for types

## MCP Tools

When working on this project with an AI agent, use these MCP tools:

- `get_schema` - View current schema
- `query_documents` - Run GROQ queries
- `get_sanity_rules` - Load development best practices

Load rules before starting:

```
get_sanity_rules({ rules: ["sanity-schema", "sanity-groq", "sanity-localization", "sanity-studio-structure"] })
```
