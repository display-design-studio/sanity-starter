function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}

export const projectId = requireEnv('SANITY_STUDIO_ID')
export const dataset = requireEnv('SANITY_STUDIO_DATASET')
