// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Boards, BoardsData, BoardsPatch, BoardsQuery, BoardsService } from './boards.class'

export type { Boards, BoardsData, BoardsPatch, BoardsQuery }

export type BoardsClientService = Pick<BoardsService<Params<BoardsQuery>>, (typeof boardsMethods)[number]>

export const boardsPath = 'boards'

export const boardsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const boardsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(boardsPath, connection.service(boardsPath), {
    methods: boardsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [boardsPath]: BoardsClientService
  }
}
