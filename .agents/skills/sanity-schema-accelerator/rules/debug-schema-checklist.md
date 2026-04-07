# Schema Debug Checklist

Use this checklist when generated schema code fails.

## Fast checks

- Import paths exist: `../../utils/groups`, `../../utils/localization`.
- Referenced types exist and are registered: `pageBuilder`, `seo`, `localeString`, `localeSlug`.
- Group names exist in `baseGroups`: at least `editorial`, `seo`.
- `defineArrayMember` is imported when used in `of` arrays.
- Preview selectors match field shape (`localeSlug` uses `.current`).
- New schema is imported and included in `schemaTypes/index.ts`.
- If singleton: type is included in `singletonTypes` in `sanity.config.ts`.
- If singleton: desk structure is wired in `structure/<singleton>.ts` and `structure/index.ts`.

## Typical fixes

- Missing type error -> add schema export and include it in schema index.
- Group error -> align `group` values with real group IDs.
- Empty insert menu preview image -> ensure files exist in `/static/preview/`.
- Undefined preview slug -> guard in `prepare` or ensure slug is required in schema.
- Singleton behaves like normal document -> missing `singletonTypes` registration.
- Singleton not visible in Studio menu -> missing `structure/` wiring.
