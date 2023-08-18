// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const teamsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.Optional(Type.String())
  },
  { $id: 'Teams', additionalProperties: false }
)
export type Teams = Static<typeof teamsSchema>
export const teamsValidator = getValidator(teamsSchema, dataValidator)
export const teamsResolver = resolve<Teams, HookContext>({})

export const teamsExternalResolver = resolve<Teams, HookContext>({})

// Schema for creating new entries
export const teamsDataSchema = Type.Pick(teamsSchema, ['name'], {
  $id: 'TeamsData'
})
export type TeamsData = Static<typeof teamsDataSchema>
export const teamsDataValidator = getValidator(teamsDataSchema, dataValidator)
export const teamsDataResolver = resolve<Teams, HookContext>({})

// Schema for updating existing entries
export const teamsPatchSchema = Type.Partial(teamsSchema, {
  $id: 'TeamsPatch'
})
export type TeamsPatch = Static<typeof teamsPatchSchema>
export const teamsPatchValidator = getValidator(teamsPatchSchema, dataValidator)
export const teamsPatchResolver = resolve<Teams, HookContext>({})

// Schema for allowed query properties
export const teamsQueryProperties = Type.Pick(teamsSchema, ['id', 'name'])
export const teamsQuerySchema = Type.Intersect(
  [
    querySyntax(teamsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TeamsQuery = Static<typeof teamsQuerySchema>
export const teamsQueryValidator = getValidator(teamsQuerySchema, queryValidator)
export const teamsQueryResolver = resolve<TeamsQuery, HookContext>({})
