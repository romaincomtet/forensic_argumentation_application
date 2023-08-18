// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Id, NullableId, Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Cases, CasesData, CasesPatch, CasesQuery } from './cases.schema'
import { BadRequest } from '@feathersjs/errors'
import makeParamsInternal from '../../Utils/makeParamsInternal'

export type { Cases, CasesData, CasesPatch, CasesQuery }

export interface CasesParams extends KnexAdapterParams<CasesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CasesService<ServiceParams extends Params = CasesParams> extends KnexService<
  Cases,
  CasesData,
  CasesParams,
  CasesPatch
> {
  private app!: Application
  setup(app: Application) {
    this.app = app
  }

  async create(data: CasesData, params?: ServiceParams): Promise<Cases>
  async create(data: CasesData[], params?: ServiceParams): Promise<Cases[]>
  async create(data: CasesData | CasesData[], params?: ServiceParams): Promise<Cases | Cases[]> {
    if (Array.isArray(data)) {
      throw new BadRequest('Cannot create multiple cases at once')
    }
    const managerUser = await this.app.service('users')._find({ query: { email: data.email } })
    if (managerUser.total === 0) {
      throw new BadRequest('User email not found')
    }
    delete data.email
    const team = await this.app.service('teams').create({}, makeParamsInternal(params))
    data.teamId = team.id
    const res = await super.create(data, params)
    await this.app.service('invitations').create(
      {
        userId: managerUser.data[0].id,
        caseId: res.id,
        status: 'pending'
      },
      makeParamsInternal(params)
    )
    return res
  }

  async patch(id: number, data: CasesPatch, params?: ServiceParams): Promise<Cases>
  async patch(id: null, data: CasesPatch, params?: ServiceParams): Promise<Cases[]>
  async patch(id: NullableId, data: CasesPatch, params?: ServiceParams): Promise<Cases | Cases[]> {
    if (Array.isArray(data) || !id) {
      throw new BadRequest('Cannot create multiple cases at once')
    }
    if (data.email) {
      const managerUser = await this.app.service('users')._find({ query: { email: data.email } })
      if (managerUser.total === 0) {
        throw new BadRequest('User email not found')
      }
      delete data.email

      const invitation = await this.app
        .service('invitations')
        ._find({ query: { caseId: Number(id), teamId: null, status: { $ne: 'canceled' } } })
      await this.app
        .service('invitations')
        .patch(invitation.data[0].id, { status: 'canceled' }, makeParamsInternal(params))
      await this.app.service('invitations').create(
        {
          userId: managerUser.data[0].id,
          caseId: Number(id),
          status: 'pending'
        },
        makeParamsInternal(params)
      )
    }

    return super.patch(id, data, params)
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'cases'
  }
}
