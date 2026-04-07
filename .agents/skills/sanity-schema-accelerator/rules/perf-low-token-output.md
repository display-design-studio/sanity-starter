# Low-Token Output Mode

Use this response format by default to reduce token usage.

## Output rules

1. Return one `ts` code block only.
2. No prose before or after code unless explicitly requested.
3. Provide one solution variant only.
4. Reuse the nearest template from this skill; change only required fields.
5. If critical information is missing, ask one short question; otherwise use defaults.

## Defaults

- Block schema: fixed `preview.prepare()` title.
- Page builder: `name: 'pageBuilder'`, list+grid insert views.
- Singleton: include `pageBuilder` and `seo`.
- Repeatable page: include `title`, `slug`, `pageBuilder`, `seo`.

## Anti-patterns (avoid)

- Long conceptual explanations.
- Multiple alternative implementations.
- Repeating unchanged boilerplate in prose.
