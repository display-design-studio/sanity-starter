import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {structure} from './structure/index'

export default defineConfig({
  name: 'default',
  title: 'Sanity Starter',
  projectId: process.env.SANITY_STUDIO_ID,
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
