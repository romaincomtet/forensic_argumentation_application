// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Teams, TeamsData, TeamsPatch, TeamsQuery } from './teams.schema'

export type { Teams, TeamsData, TeamsPatch, TeamsQuery }

export interface TeamsParams extends KnexAdapterParams<TeamsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TeamsService<ServiceParams extends Params = TeamsParams> extends KnexService<
  Teams,
  TeamsData,
  TeamsParams,
  TeamsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'teams'
  }
}
