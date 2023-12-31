// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { StringEnum, Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { BadRequest } from '@feathersjs/errors'
import { userSchema } from '../users/users.schema'
export const invitationsSchema = Type.Object(
  {
    id: Type.Number(),
    invitedBy: Type.Number(),
    userId: Type.Number(),
    caseId: Type.Number(),
    isManager: Type.Optional(Type.Boolean({ default: false })),
    status: StringEnum(['pending', 'accepted', 'refused', 'canceled']),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),

    user: Type.Optional(Type.Ref(userSchema))
  },
  { $id: 'Invitations', additionalProperties: false }
)
export type Invitations = Static<typeof invitationsSchema>
export const invitationsValidator = getValidator(invitationsSchema, dataValidator)
export const invitationsResolver = resolve<Invitations, HookContext>({})

export const invitationsExternalResolver = resolve<Invitations, HookContext>({
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
export const invitationsDataSchema = Type.Pick(
  invitationsSchema,
  ['userId', 'caseId', 'isManager', 'status'],
  {
    $id: 'InvitationsData'
  }
)
export type InvitationsData = Static<typeof invitationsDataSchema>
export const invitationsDataValidator = getValidator(invitationsDataSchema, dataValidator)
export const invitationsDataResolver = resolve<Invitations, HookContext>({
  invitedBy: async (value, row, context) => {
    return context.params.user.id
  },
  caseId: async (value, row, context) => {
    if (!value) throw new BadRequest('CaseId is required')
    const caseInfo = await context.app.service('cases')._get(value)
    if (
      caseInfo.organisationUserId !== context.params.user.id &&
      caseInfo.managerUserId !== context.params.user.id
    ) {
      throw new BadRequest('You are not allowed to invite users to this case')
    }
    return value
  }
})

// Schema for updating existing entries
export const invitationsPatchSchema = Type.Pick(invitationsSchema, ['status'], {
  $id: 'InvitationsPatch'
})
export type InvitationsPatch = Static<typeof invitationsPatchSchema>
export const invitationsPatchValidator = getValidator(invitationsPatchSchema, dataValidator)
export const invitationsPatchResolver = resolve<Invitations, HookContext>({
  // check if user is allowed to update this invitation
  status: async (value, row, context) => {
    if (context.params.provider === undefined) return value

    if (value === 'canceled') {
      throw new BadRequest('You are not allowed to cancel invitation')
    }
    const invitation = await context.app.service('invitations')._get(context.id!)
    if (invitation.userId !== context.params.user.id) {
      throw new BadRequest('You are not allowed to update this invitation')
    }
    if (invitation.status !== 'pending') {
      throw new BadRequest('Your invitation is not pending')
    }
    return value
  },
  updatedAt: async () => {
    return new Date().toISOString()
  }
})

// Schema for cancelling invitation when manager
export const invitationsCancelSchema = Type.Pick(invitationsSchema, ['id'], {
  $id: 'invitationsCancel'
})
export type InvitationsCancel = Static<typeof invitationsCancelSchema>
export const invitationsCancelValidator = getValidator(invitationsCancelSchema, dataValidator)
export const invitationsCancelResolver = resolve<Invitations, HookContext>({
  id: async (value, row, context) => {
    if (!value) throw new BadRequest('id is required')
    const invitationInfo = await context.app.service('invitations')._get(value)

    const caseInfo = await context.app.service('cases')._get(invitationInfo.caseId)
    if (
      caseInfo.managerUserId !== context.params.user?.id &&
      caseInfo.organisationUserId !== context.params.user?.id
    ) {
      throw new Error('You are not allowed to cancel this invitation')
    }
    return value
  }
})

// Schema for allowed query properties
export const invitationsQueryProperties = Type.Pick(invitationsSchema, [
  'id',
  'userId',
  'caseId',
  'isManager',
  'status',
  'createdAt',
  'invitedBy'
])
export const invitationsQuerySchema = Type.Intersect(
  [
    querySyntax(invitationsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type InvitationsQuery = Static<typeof invitationsQuerySchema>
export const invitationsQueryValidator = getValidator(invitationsQuerySchema, queryValidator)
export const invitationsQueryResolver = resolve<InvitationsQuery, HookContext>({})
