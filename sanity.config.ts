import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { locations, mainDocuments } from './presentation/resolve'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure/index'

//Utils
import { dataset, projectId } from './utils/env'

//Plugins
import { languageFilter } from '@sanity/language-filter'
import { media } from 'sanity-plugin-media-i18n'
import { baseLanguage, supportedLanguages } from './utils/localization'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['home'])

export default defineConfig({
  name: 'default',
  title: 'Sanity Starter',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    media(),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_URL,
      },
      allowOrigins: ['http://localhost:*'],
      resolve: {
        locations,
        mainDocuments,
      },
    }),
    languageFilter({
      supportedLanguages,
      defaultLanguages: [baseLanguage?.id],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },

  scheduledPublishing: {
    enabled: false,
  },

  scheduledDrafts: {
    enabled: false,
  },

  tasks: {
    enabled: false,
  },

  releases: {
    enabled: false,
  },
})
