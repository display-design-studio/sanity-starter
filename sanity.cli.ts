import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  deployment: {autoUpdates: true},
  typegen: {
    path: [
      './src/**/*.{ts,tsx,js,jsx}',
      '../src/**/*.{ts,tsx,js,jsx}',
      '../app/**/*.{ts,js}',
      '../composables/**/*.{ts,js}',
      '../utils/**/*.{ts,js}',
      '../components/**/*.{ts,js}',
    ],
    schema: 'types/schema.json',
    generates: 'types/sanity.types.ts',
    overloadClientMethods: true,
  },
})
