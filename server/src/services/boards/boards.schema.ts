// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { BadRequest } from '@feathersjs/errors'

// Main data model schema
export const boardsSchema = Type.Object(
  {
    id: Type.Number(),
    caseName: Type.String(),
    caseId: Type.Number(), // This assumes you have a 'cases' schema defined somewhere

    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Boards', additionalProperties: false }
)
export type Boards = Static<typeof boardsSchema>
export const boardsValidator = getValidator(boardsSchema, dataValidator)
export const boardsResolver = resolve<Boards, HookContext>({})

export const boardsExternalResolver = resolve<Boards, HookContext>({})

// Schema for creating new entries
export const boardsDataSchema = Type.Pick(boardsSchema, ['caseName', 'caseId'], {
  $id: 'BoardsData'
})
export type BoardsData = Static<typeof boardsDataSchema>
export const boardsDataValidator = getValidator(boardsDataSchema, dataValidator)
export const boardsDataResolver = resolve<Boards, HookContext>({
  caseId: async (value, row, context) => {
    if (value) {
      const caseExists = await context.app.service('cases')._get(value)
      if (!caseExists) {
        throw new BadRequest('Case does not exist')
      }
      if (
        caseExists.managerUserId !== context.params.user.id &&
        caseExists.organisationUserId !== context.params.user.id
      ) {
        throw new BadRequest('You are not the manager or organisation user of this case')
      }
    }
    return value
  }
})

// Schema for updating existing entries
export const boardsPatchSchema = Type.Pick(boardsSchema, ['caseName'], {
  $id: 'BoardsPatch'
})
export type BoardsPatch = Static<typeof boardsPatchSchema>
export const boardsPatchValidator = getValidator(boardsPatchSchema, dataValidator)
export const boardsPatchResolver = resolve<Boards, HookContext>({
  id: async (value, row, context) => {
    if (!context.id) {
      throw new BadRequest('Missing id')
    }
    const board = await context.app.service('boards')._get(context.id)
    const caseExists = await context.app.service('cases')._get(board.caseId)
    if (!caseExists) {
      throw new BadRequest('Case does not exist')
    }
    if (
      caseExists.managerUserId !== context.params.user.id &&
      caseExists.organisationUserId !== context.params.user.id
    ) {
      throw new BadRequest('You are not the manager or organisation user of this case')
    }
    return value
  },
  updatedAt: async () => {
    return new Date().toISOString()
  }
})

// Schema for allowed query properties
export const boardsQueryProperties = Type.Pick(boardsSchema, ['caseName', 'caseId', 'updatedAt'])
export const boardsQuerySchema = Type.Intersect(
  [
    querySyntax(boardsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BoardsQuery = Static<typeof boardsQuerySchema>
export const boardsQueryValidator = getValidator(boardsQuerySchema, queryValidator)
export const boardsQueryResolver = resolve<BoardsQuery, HookContext>({})
