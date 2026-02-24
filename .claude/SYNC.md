# Skills Sync Workflow

Skills in `.claude/skills/` are sourced from [`display-design-studio/skills`](https://github.com/display-design-studio/skills), tracked as a git submodule at `vendor/skills`.

Three skills have custom descriptions maintained locally and captured in `.claude/patches/description-improvements.patch`:
- `content-modeling-best-practices`
- `content-experimentation-best-practices`
- `seo-aeo-best-practices`

---

## Syncing from upstream

```bash
# 1. Pull latest upstream changes
git submodule update --remote vendor/skills

# 2. Copy updated skill directories to .claude/skills/
for skill in content-modeling-best-practices content-experimentation-best-practices seo-aeo-best-practices sanity-best-practices; do
  cp -r vendor/skills/skills/$skill .claude/skills/$skill
done

# 3. Re-apply custom descriptions
git apply .claude/patches/description-improvements.patch

# 4. Commit the update
git add vendor/skills .claude/skills
git commit -m "chore: sync skills from upstream"
```

---

## Refreshing the patch after editing descriptions

If you edit the `description:` field in any of the three custom SKILL.md files, regenerate the patch:

```bash
> .claude/patches/description-improvements.patch

for skill in content-modeling-best-practices content-experimentation-best-practices seo-aeo-best-practices; do
  git diff --no-index \
    vendor/skills/skills/$skill/SKILL.md \
    .claude/skills/$skill/SKILL.md \
    >> .claude/patches/description-improvements.patch || true
done

# Verify it applies cleanly
git apply --check .claude/patches/description-improvements.patch
```

---

## Adding a new skill

```bash
# Copy from vendor
cp -r vendor/skills/skills/<skill-name> .claude/skills/<skill-name>

# Stage and commit
git add .claude/skills/<skill-name>
git commit -m "feat: add <skill-name> skill"
```

If the new skill needs a custom description, edit `SKILL.md` then refresh the patch (see above).
