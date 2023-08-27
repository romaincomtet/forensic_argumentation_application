// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Elements, ElementsData, ElementsPatch, ElementsQuery } from './elements.schema'

export type { Elements, ElementsData, ElementsPatch, ElementsQuery }

export interface ElementsParams extends KnexAdapterParams<ElementsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ElementsService<ServiceParams extends Params = ElementsParams> extends KnexService<
  Elements,
  ElementsData,
  ElementsParams,
  ElementsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'elements'
  }
}
