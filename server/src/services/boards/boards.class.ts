// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Id, NullableId, Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Boards, BoardsData, BoardsPatch, BoardsQuery } from './boards.schema'
import { BadRequest } from '@feathersjs/errors'
import { User } from '../users/users.schema'

export type { Boards, BoardsData, BoardsPatch, BoardsQuery }

export interface BoardsParams extends KnexAdapterParams<BoardsQuery> {
  user: User
}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BoardsService<ServiceParams extends Params = BoardsParams> extends KnexService<
  Boards,
  BoardsData,
  BoardsParams,
  BoardsPatch
> {
  private app!: Application
  setup(app: Application) {
    this.app = app
  }

  async remove(id: Id, params?: BoardsParams): Promise<Boards>
  async remove(id: null, params?: BoardsParams): Promise<Boards[]>
  async remove(id: NullableId, params?: BoardsParams): Promise<Boards | Boards[]> {
    if (id === null || !params) {
      throw new BadRequest('Cannot delete multiple boards at once')
    }
    if (id) {
      const caseExists = await this.app.service('cases')._get(id)
      if (!caseExists) {
        throw new BadRequest('Case does not exist')
      }
      if (caseExists.managerUserId !== params.user.id && caseExists.organisationUserId !== params.user.id) {
        throw new BadRequest('You are not the manager or organisation user of this case')
      }
    }
    return super.remove(id, params)
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'boards'
  }
}
