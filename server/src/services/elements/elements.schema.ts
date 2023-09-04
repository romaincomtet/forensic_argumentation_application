// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const elementsSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Elements', additionalProperties: false }
)
export type Elements = Static<typeof elementsSchema>
export const elementsValidator = getValidator(elementsSchema, dataValidator)
export const elementsResolver = resolve<Elements, HookContext>({})

export const elementsExternalResolver = resolve<Elements, HookContext>({})

// Schema for creating new entries
export const elementsDataSchema = Type.Pick(elementsSchema, ['text'], {
  $id: 'ElementsData'
})
export type ElementsData = Static<typeof elementsDataSchema>
export const elementsDataValidator = getValidator(elementsDataSchema, dataValidator)
export const elementsDataResolver = resolve<Elements, HookContext>({})

// Schema for updating existing entries
export const elementsPatchSchema = Type.Partial(elementsSchema, {
  $id: 'ElementsPatch'
})
export type ElementsPatch = Static<typeof elementsPatchSchema>
export const elementsPatchValidator = getValidator(elementsPatchSchema, dataValidator)
export const elementsPatchResolver = resolve<Elements, HookContext>({})

// Schema for allowed query properties
export const elementsQueryProperties = Type.Pick(elementsSchema, ['id', 'text'])
export const elementsQuerySchema = Type.Intersect(
  [
    querySyntax(elementsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ElementsQuery = Static<typeof elementsQuerySchema>
export const elementsQueryValidator = getValidator(elementsQuerySchema, queryValidator)
export const elementsQueryResolver = resolve<ElementsQuery, HookContext>({})
