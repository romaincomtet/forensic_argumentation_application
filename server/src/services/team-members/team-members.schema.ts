// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const teamMembersSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'TeamMembers', additionalProperties: false }
)
export type TeamMembers = Static<typeof teamMembersSchema>
export const teamMembersValidator = getValidator(teamMembersSchema, dataValidator)
export const teamMembersResolver = resolve<TeamMembers, HookContext>({})

export const teamMembersExternalResolver = resolve<TeamMembers, HookContext>({})

// Schema for creating new entries
export const teamMembersDataSchema = Type.Pick(teamMembersSchema, ['text'], {
  $id: 'TeamMembersData'
})
export type TeamMembersData = Static<typeof teamMembersDataSchema>
export const teamMembersDataValidator = getValidator(teamMembersDataSchema, dataValidator)
export const teamMembersDataResolver = resolve<TeamMembers, HookContext>({})

// Schema for updating existing entries
export const teamMembersPatchSchema = Type.Partial(teamMembersSchema, {
  $id: 'TeamMembersPatch'
})
export type TeamMembersPatch = Static<typeof teamMembersPatchSchema>
export const teamMembersPatchValidator = getValidator(teamMembersPatchSchema, dataValidator)
export const teamMembersPatchResolver = resolve<TeamMembers, HookContext>({})

// Schema for allowed query properties
export const teamMembersQueryProperties = Type.Pick(teamMembersSchema, ['id', 'text'])
export const teamMembersQuerySchema = Type.Intersect(
  [
    querySyntax(teamMembersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TeamMembersQuery = Static<typeof teamMembersQuerySchema>
export const teamMembersQueryValidator = getValidator(teamMembersQuerySchema, queryValidator)
export const teamMembersQueryResolver = resolve<TeamMembersQuery, HookContext>({})
