# Sanity Patterns for This Project

## Creating a New Document Type

```ts
import {defineType, defineField} from 'sanity'
import {baseLanguage} from '../../utils/localization'

export const myDocument = defineType({
  name: 'myDocument',
  title: 'My Document',
  type: 'document',
  options: {
    languageFilter: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    // Add more fields...
  ],
  preview: {
    select: {
      title: `title.${baseLanguage.id}`,
    },
    prepare({title}) {
      return {title}
    },
  },
})
```

Then add to `schemaTypes/index.ts`.

## Creating a Singleton Document

1. Define the document type as normal
2. Add to `singletonTypes` Set in `sanity.config.ts`
3. Create structure file in `structure/` folder
4. Add to main structure in `structure/index.ts`

## Adding a New Language

Edit `utils/localization.ts`:

```ts
export const supportedLanguages: supportedLanguage[] = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'it', title: 'Italian'},
  {id: 'fr', title: 'French'}, // New language
]
```

## Structure Builder Pattern

```ts
import {StructureBuilder} from 'sanity/structure'

export const myDocumentStructure = (S: StructureBuilder) =>
  S.listItem().title('My Documents').child(S.documentTypeList('myDocument').title('My Documents'))
```

## Locale Field Types

Use these types for localized content:

| Type           | Use Case                    |
| -------------- | --------------------------- |
| `localeString` | Short text (titles, labels) |
| `localeText`   | Long text (descriptions)    |
| `localeBlock`  | Rich text content           |
| `localeSlug`   | URL slugs per language      |
