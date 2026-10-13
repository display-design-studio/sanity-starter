import type {RuleDef} from 'sanity'

export const hiddenUnless =
  (requiredType: string) =>
  ({parent}: {parent?: {type?: string}}) =>
    parent?.type !== requiredType

export const requireWhen =
  (requiredType: string, message: string, check?: (value: unknown) => boolean) =>
  <T extends RuleDef<T, V>, V = unknown>(rule: T) =>
    rule.custom((value, context) => {
      const parent = context.parent as {type?: string} | undefined
      const passes = check ? check(value) : !!value
      return parent?.type !== requiredType || passes ? true : message
    })
