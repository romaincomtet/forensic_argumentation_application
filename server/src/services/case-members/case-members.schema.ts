// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'
import { BadRequest } from '@feathersjs/errors'

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

// Schema for cancelling invitation when manager
export const managerRemoveMemberSchema = Type.Pick(caseMembersSchema, ['userId', 'caseId'], {
  $id: 'managerRemoveMember'
})
export type ManagerRemoveMember = Static<typeof managerRemoveMemberSchema>
export const managerRemoveMemberValidator = getValidator(managerRemoveMemberSchema, dataValidator)
export const managerRemoveMemberResolver = resolve<CaseMembers, HookContext>({
  userId: async (value, row, context) => {
    const caseInfo = await context.app.service('cases')._get(row.caseId)
    if (
      caseInfo.managerUserId !== context.params.user?.id &&
      caseInfo.organisationUserId !== context.params.user?.id
    ) {
      throw new BadRequest('You are not allowed to cancel this invitation')
    }

    const caseMemberInfo = await context.app
      .service('case-members')
      ._find({ query: { caseId: row.caseId, userId: value } })
    if (caseMemberInfo.total === 0) {
      throw new Error('This user is not a member of this case')
    }
    return value
  }
})

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
