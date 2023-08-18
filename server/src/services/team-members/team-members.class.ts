// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { TeamMembers, TeamMembersData, TeamMembersPatch, TeamMembersQuery } from './team-members.schema'

export type { TeamMembers, TeamMembersData, TeamMembersPatch, TeamMembersQuery }

export interface TeamMembersParams extends KnexAdapterParams<TeamMembersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TeamMembersService<ServiceParams extends Params = TeamMembersParams> extends KnexService<
  TeamMembers,
  TeamMembersData,
  TeamMembersParams,
  TeamMembersPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'team-members'
  }
}
