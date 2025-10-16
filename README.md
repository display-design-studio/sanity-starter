<div align="center">
  <a href="https://github.com/display-design-studio/template-shopify-theme">
    <img src="https://avatars.githubusercontent.com/u/118281951?s=400&u=3ba5b42657ae2ac1a064b998b6110ea422317790&v=0" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Sanity Starter</h3>
</div>

# Sanity Starter

A starter template for Sanity projects with built-in localization utilities, presentation tool, and automatic types generation.

## Features

- Localization utilities for multilingual content
- Presentation tool for custom document views
- Automatic TypeScript types generation from Sanity schemas

## Plugins Used

- [`@sanity/language-filter`](https://www.npmjs.com/package/@sanity/language-filter): Language filter for Sanity Studio
- [`sanity-plugin-media-i18n`](https://www.npmjs.com/package/sanity-plugin-media-i18n): Internationalization for media fields

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```
2. Start the development server:
   ```bash
   bun run dev
   ```
3. Generate types:
   ```bash
   bun run generate-types
   ```

## Scripts

- `dev`: Start Sanity Studio in development mode
- `build`: Build the Studio and generate types
- `deploy`: Deploy the Studio
- `generate-types`: Extract schema and generate TypeScript types

## License

MIT
