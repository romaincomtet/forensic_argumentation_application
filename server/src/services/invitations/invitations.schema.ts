// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { StringEnum, Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { BadRequest } from '@feathersjs/errors'
export const invitationsSchema = Type.Object(
  {
    id: Type.Number(),
    invitedBy: Type.Number(),
    userId: Type.Number(),
    caseId: Type.Number(),
    teamId: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
    status: StringEnum(['pending', 'accepted', 'refused', 'canceled']),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Invitations', additionalProperties: false }
)
export type Invitations = Static<typeof invitationsSchema>
export const invitationsValidator = getValidator(invitationsSchema, dataValidator)
export const invitationsResolver = resolve<Invitations, HookContext>({})

export const invitationsExternalResolver = resolve<Invitations, HookContext>({})

// Schema for creating new entries
export const invitationsDataSchema = Type.Pick(invitationsSchema, ['userId', 'caseId', 'teamId', 'status'], {
  $id: 'InvitationsData'
})
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

// Schema for allowed query properties
export const invitationsQueryProperties = Type.Pick(invitationsSchema, [
  'id',
  'userId',
  'caseId',
  'teamId',
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
