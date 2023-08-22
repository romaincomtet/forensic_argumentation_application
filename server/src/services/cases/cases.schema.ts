// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { StringEnum, Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { BadRequest } from '@feathersjs/errors'
import { caseMembersSchema } from '../case-members/case-members.schema'

export const casesSchema = Type.Object(
  {
    id: Type.Number(),
    organisationName: Type.String(),
    caseName: Type.String(),
    caseNumber: Type.String(),
    organisationUserId: Type.Number(),
    managerUserId: Type.Number(),

    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' }),

    invitation: Type.Optional(
      Type.Object({ status: StringEnum(['pending', 'accepted', 'refused', 'canceled']) })
    ),
    caseMembers: Type.Optional(Type.Array(Type.Ref(caseMembersSchema)))
  },
  { $id: 'Cases', additionalProperties: false }
)

export type Cases = Static<typeof casesSchema>
export const casesValidator = getValidator(casesSchema, dataValidator)
export const casesResolver = resolve<Cases, HookContext>({})

export const casesExternalResolver = resolve<Cases, HookContext>({
  invitation: async (value, row, context) => {
    if (!row.managerUserId) {
      const invitation = await context.app
        .service('invitations')
        ._find({ query: { caseId: row.id, isManager: true, $sort: { createdAt: -1 }, $limit: 1 } })
      return invitation.data[0]
    }
    return undefined
  },
  caseMembers: async (value, row, context) => {
    if (['get', 'find'].includes(context.method)) {
      const caseMembers = await context.app.service('case-members')._find({ query: { caseId: row.id } })
      return caseMembers.data
    }
    return undefined
  }
})

// Schema for creating new entries
export const casesDataSchema = Type.Intersect(
  [
    Type.Pick(casesSchema, ['organisationName', 'caseName', 'caseNumber']),
    Type.Partial(Type.Object({ email: Type.String() }))
  ],
  {
    $id: 'CasesData'
  }
)

export type CasesData = Static<typeof casesDataSchema>
export const casesDataValidator = getValidator(casesDataSchema, dataValidator)
export const casesDataResolver = resolve<Cases & CasesData, HookContext>({
  organisationUserId: async (value, row, context) => {
    if (context.params.user.isOrganisationUser === false)
      throw new BadRequest('Only organisation users can create cases')
    return context.params.user.id
  },
  email: async (value) => {
    if (!value) {
      throw new BadRequest('Email is required')
    }
    return value
  }
})

// Schema for creating new entries
export const casesMemberDataSchema = Type.Intersect(
  [Type.Pick(casesSchema, ['id']), Type.Object({ email: Type.String({ format: 'email' }) })],
  {
    $id: 'casesMemberData'
  }
)

export type casesMemberData = Static<typeof casesMemberDataSchema>
export const casesMemberDataValidator = getValidator(casesMemberDataSchema, dataValidator)
export const casesMemberDataResolver = resolve<casesMemberData, HookContext>({})

// Schema for updating existing entries
export const casesPatchSchema = Type.Intersect(
  [
    Type.Partial(Type.Pick(casesSchema, ['organisationName', 'caseName', 'caseNumber', 'managerUserId'])),
    Type.Partial(Type.Object({ email: Type.String() }))
  ],
  {
    $id: 'CasesPatch'
  }
)
export type CasesPatch = Static<typeof casesPatchSchema>
export const casesPatchValidator = getValidator(casesPatchSchema, dataValidator)
export const casesPatchResolver = resolve<Cases & CasesPatch, HookContext>({
  // can be updated only by an internal call
  managerUserId: async (value, row, context) => {
    if (context.params.provider === undefined) {
      return value
    }
    return undefined
  },
  email: async (value, row, context) => {
    if (!context.id) {
      return undefined
    }
    if (value) {
      const caseInfo = await context.app.service('cases')._get(context.id)
      if (caseInfo.managerUserId) throw new BadRequest('you cannot modify the user manager on this route')
    }
    return value
  },
  updatedAt: async () => {
    return new Date().toISOString()
  }
})

// Schema for allowed query properties
export const casesQueryProperties = Type.Pick(casesSchema, [
  'id',
  'organisationName',
  'caseName',
  'caseNumber',
  'updatedAt',
  'organisationUserId',
  'managerUserId'
])
export const casesQuerySchema = Type.Intersect(
  [
    querySyntax(casesQueryProperties, {
      caseName: {
        $ilike: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object(
      {
        'case-members.userId': Type.Optional(Type.Number())
      },
      { additionalProperties: false }
    )
  ],
  { additionalProperties: false }
)
export type CasesQuery = Static<typeof casesQuerySchema>
export const casesQueryValidator = getValidator(casesQuerySchema, queryValidator)
export const casesQueryResolver = resolve<CasesQuery, HookContext>({
  'case-members.userId': async (value, row, context) => {
    if (value) {
      return context.params.user.id
    }
    return undefined
  },
  managerUserId: async (value, row, context) => {
    if (value) {
      return context.params.user.id
    }

    return undefined
  },
  $or: async (value, row, context) => {
    if (!row.managerUserId && !row.organisationUserId && !row['case-members.userId']) {
      return [
        { managerUserId: context.params.user.id },
        { organisationUserId: context.params.user.id },
        { 'case-members.userId': context.params.user.id }
      ]
    }
    return value
  },
  organisationUserId: async (value, row, context) => {
    if (value) {
      return context.params.user.id
    }
    return undefined
  }
})
