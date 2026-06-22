import type {Rule} from 'sanity'

export const hiddenUnless =
  (requiredType: string) =>
  ({parent}: {parent?: {type?: string}}) =>
    parent?.type !== requiredType

export const requireWhen =
  (requiredType: string, message: string, check?: (value: unknown) => boolean) =>
  (rule: Rule) =>
    rule.custom((value, context) => {
      const parent = context.parent as {type?: string} | undefined
      const passes = check ? check(value) : !!value
      return parent?.type !== requiredType || passes ? true : message
    })
