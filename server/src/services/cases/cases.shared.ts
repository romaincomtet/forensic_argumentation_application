// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Cases, CasesData, CasesPatch, CasesQuery, CasesService } from './cases.class'

export type { Cases, CasesData, CasesPatch, CasesQuery }

export type CasesClientService = Pick<CasesService<Params<CasesQuery>>, (typeof casesMethods)[number]>

export const casesPath = 'cases'

export const casesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const casesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(casesPath, connection.service(casesPath), {
    methods: casesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [casesPath]: CasesClientService
  }
}
