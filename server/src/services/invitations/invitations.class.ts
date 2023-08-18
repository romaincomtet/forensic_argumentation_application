// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Invitations, InvitationsData, InvitationsPatch, InvitationsQuery } from './invitations.schema'

export type { Invitations, InvitationsData, InvitationsPatch, InvitationsQuery }

export interface InvitationsParams extends KnexAdapterParams<InvitationsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class InvitationsService<ServiceParams extends Params = InvitationsParams> extends KnexService<
  Invitations,
  InvitationsData,
  InvitationsParams,
  InvitationsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'invitations'
  }
}
