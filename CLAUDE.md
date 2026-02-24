# Sanity Starter — Claude Code context

Sanity Studio starter with localization, presentation tool, and automatic TypeScript type generation.

## Stack

- Sanity Studio v3
- TypeScript
- Bun (package manager)
- Plugins: `@sanity/language-filter`, `sanity-plugin-media-i18n`

## Key scripts

```bash
bun run dev            # start Studio in dev mode
bun run build          # build + generate types
bun run generate-types # extract schema and generate sanity.types.ts
```

## Active task: migrate skills from `.agents/` to `.claude/`

Skills are currently in `.agents/skills/`. We're migrating everything to `.claude/` to align with Claude Code conventions.

### Target structure

```
.claude/
├── CLAUDE.md
├── SYNC.md                          # skills sync workflow
├── patches/
│   └── description-improvements.patch
└── skills/
    ├── sanity.md
    ├── sanity-best-practices/
    ├── content-modeling-best-practices/
    ├── content-experimentation-best-practices/
    └── seo-aeo-best-practices/
```

### Steps to complete

1. Move `.agents/skills/` → `.claude/skills/`
2. Move `SYNC.md` → `.claude/SYNC.md` and update all internal paths (`.agents/skills/` → `.claude/skills/`)
3. Move `patches/` → `.claude/patches/` and update path references in SYNC.md
4. Delete `.agents/` once everything is moved
5. Verify the patch still applies cleanly: `git apply .claude/patches/description-improvements.patch`
6. Commit everything

### Skills inventory

| Skill | Source | Custom description? |
|---|---|---|
| `sanity-best-practices` | `display-design-studio/skills` | No |
| `content-modeling-best-practices` | `display-design-studio/skills` | ✅ Yes |
| `content-experimentation-best-practices` | `display-design-studio/skills` | ✅ Yes |
| `seo-aeo-best-practices` | `display-design-studio/skills` | ✅ Yes |

Custom descriptions are maintained in `patches/description-improvements.patch` and re-applied after every upstream sync. See `SYNC.md` for the full workflow.

### Upstream source

Skills come from [`display-design-studio/skills`](https://github.com/display-design-studio/skills), to be tracked as a submodule under `vendor/skills`. Submodule not yet added — add it with:

```bash
git submodule add https://github.com/display-design-studio/skills.git vendor/skills
```
