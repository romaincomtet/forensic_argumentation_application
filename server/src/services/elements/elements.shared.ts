// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Elements, ElementsData, ElementsPatch, ElementsQuery, ElementsService } from './elements.class'

export type { Elements, ElementsData, ElementsPatch, ElementsQuery }

export type ElementsClientService = Pick<
  ElementsService<Params<ElementsQuery>>,
  (typeof elementsMethods)[number]
>

export const elementsPath = 'elements'

export const elementsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const elementsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(elementsPath, connection.service(elementsPath), {
    methods: elementsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [elementsPath]: ElementsClientService
  }
}
