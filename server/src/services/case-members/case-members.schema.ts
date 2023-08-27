// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'

const permissionValueSchema = Type.Partial(
  Type.Object({
    canRead: Type.Boolean(),
    canEdit: Type.Boolean(),
    canConfigure: Type.Boolean()
  })
)

// Main data model schema
export const caseMembersSchema = Type.Object(
  {
    caseId: Type.Number(),
    userId: Type.Number(),
    permissionJson: Type.Union([Type.Record(Type.String(), permissionValueSchema), Type.String()]),

    user: Type.Optional(Type.Ref(userSchema))
  },
  { $id: 'CaseMembers', additionalProperties: false }
)
export type CaseMembers = Static<typeof caseMembersSchema>
export const caseMembersValidator = getValidator(caseMembersSchema, dataValidator)
export const caseMembersResolver = resolve<CaseMembers, HookContext>({})

export const caseMembersExternalResolver = resolve<CaseMembers, HookContext>({
  user: virtual(async (row, context) => {
    if (row.userId) {
      const user = await context.app
        .service('users')
        ._get(row.userId, { query: { $select: ['email', 'name'] } })
      return user
    }
    return undefined
  })
})

// Schema for creating new entries
export const caseMembersDataSchema = Type.Pick(caseMembersSchema, ['caseId', 'userId', 'permissionJson'], {
  $id: 'CaseMembersData'
})
export type CaseMembersData = Static<typeof caseMembersDataSchema>
export const caseMembersDataValidator = getValidator(caseMembersDataSchema, dataValidator)
export const caseMembersDataResolver = resolve<CaseMembers, HookContext>({})

// Schema for updating existing entries
export const caseMembersPatchSchema = Type.Partial(caseMembersSchema, {
  $id: 'CaseMembersPatch'
})
export type CaseMembersPatch = Static<typeof caseMembersPatchSchema>
export const caseMembersPatchValidator = getValidator(caseMembersPatchSchema, dataValidator)
export const caseMembersPatchResolver = resolve<CaseMembers, HookContext>({})

// Schema for allowed query properties
export const caseMembersQueryProperties = Type.Pick(caseMembersSchema, ['caseId', 'userId'])
export const caseMembersQuerySchema = Type.Intersect(
  [
    querySyntax(caseMembersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CaseMembersQuery = Static<typeof caseMembersQuerySchema>
export const caseMembersQueryValidator = getValidator(caseMembersQuerySchema, queryValidator)
export const caseMembersQueryResolver = resolve<CaseMembersQuery, HookContext>({})
