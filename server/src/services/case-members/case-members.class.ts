// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  CaseMembers,
  CaseMembersData,
  CaseMembersPatch,
  CaseMembersQuery,
  ManagerRemoveMember
} from './case-members.schema'

export type { CaseMembers, CaseMembersData, CaseMembersPatch, CaseMembersQuery }

export interface CaseMembersParams extends KnexAdapterParams<CaseMembersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CaseMembersService<ServiceParams extends Params = CaseMembersParams> extends KnexService<
  CaseMembers,
  CaseMembersData,
  CaseMembersParams,
  CaseMembersPatch
> {
  async managerRemoveMember(data: ManagerRemoveMember, params?: CaseMembersParams): Promise<CaseMembers> {
    const del = await super.remove(null, { query: { caseId: data.caseId, userId: data.userId } })
    if (Array.isArray(del)) {
      return del[0]
    }
    return del
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'case-members',
    multi: ['patch', 'remove']
  }
}
