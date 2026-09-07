function requireEnv(key: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}

export const projectId = requireEnv('SANITY_STUDIO_ID', process.env.SANITY_STUDIO_ID)
export const dataset = requireEnv('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET)
