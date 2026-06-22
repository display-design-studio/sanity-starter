<div align="center">
  <a href="https://github.com/display-design-studio/template-shopify-theme">
    <img src="https://avatars.githubusercontent.com/u/118281951?s=400&u=3ba5b42657ae2ac1a064b998b6110ea422317790&v=0" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Sanity Starter</h3>
  <p align="center">A Sanity Studio v6 starter template with built-in localization utilities, presentation tool, and automatic types generation.
</p>
</div>
<br>

## Features

- Localization utilities for multilingual content
  - Types: [localeBlock](/schemaTypes/custom-types/localeBlock.ts), [localeSlug](/schemaTypes/custom-types/localeSlug.ts), [localeString](/schemaTypes/custom-types/localeString.ts), [localeText](/schemaTypes/custom-types/localeText.ts)
  - Utils: Languages array -> [localization.ts](/utils/localization.ts)

- Presentation tool for custom document views
  - [resolve.ts](/presentation/resolve.ts)
- Automatic TypeScript types generation from Sanity schemas
  - [sanity.types.ts](/types/sanity.types.ts)

## Plugins Used

- [`@sanity/language-filter`](https://www.npmjs.com/package/@sanity/language-filter): Language filter for Sanity Studio
- [`sanity-plugin-media`](https://www.npmjs.com/package/sanity-plugin-media): Digital asset manager for Sanity Studio

## AI & MCP

Install the [Sanity MCP server](https://www.sanity.io/docs/ai/mcp-server) to let your AI assistant query, create, and patch documents directly — with automatic schema awareness, no manual context needed. Pair it with [`AGENTS.md`](./AGENTS.md) for full project context across Claude, Cursor, Copilot, and other AI tools.

## Scripts

- `dev`: Start Sanity Studio in development mode
- `build`: Build the Studio and generate types
- `deploy`: Deploy the Studio
- `typegen`: Extract schema and generate TypeScript types
- `typegen:watch`: Watch mode for type generation

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```
2. Set .env variables:
   ```bash
   SANITY_STUDIO_ID="ID_HERE"
   SANITY_STUDIO_PREVIEW_URL="STUDIO_URL_HERE"
   SANITY_STUDIO_DATASET="production"
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```
4. Generate types:
   ```bash
   bun run typegen
   ```

## License

MIT
