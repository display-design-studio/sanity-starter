/**
 * Typed GROQ queries using defineQuery.
 *
 * Each query variable name determines the generated TypeScript type name.
 * Example: HOME_QUERY → HOME_QUERYResult (generated in types/sanity.types.ts)
 *
 * After adding or modifying queries, run:
 *   bun run typegen
 *
 * Usage in your frontend:
 *   import { client } from '@/lib/sanity'
 *   import { HOME_QUERY } from '../sanity/queries'
 *   import type { HOME_QUERYResult } from '../sanity/types/sanity.types'
 *
 *   const home: HOME_QUERYResult = await client.fetch(HOME_QUERY)
 */

import {defineQuery} from 'groq'

// ─── Home ────────────────────────────────────────────────────────────────────

export const HOME_QUERY = defineQuery(`
  *[_type == "home"][0] {
    _id,
    _type,
    title,
    description,
    content
  }
`)

// ─── Pages ───────────────────────────────────────────────────────────────────

export const PAGES_QUERY = defineQuery(`
  *[_type == "page"] | order(_createdAt asc) {
    _id,
    _type,
    title,
    slug,
    description
  }
`)

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug[$lang].current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    content
  }
`)
