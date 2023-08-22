// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  CaseMembers,
  CaseMembersData,
  CaseMembersPatch,
  CaseMembersQuery,
  CaseMembersService
} from './case-members.class'

export type { CaseMembers, CaseMembersData, CaseMembersPatch, CaseMembersQuery }

export type CaseMembersClientService = Pick<
  CaseMembersService<Params<CaseMembersQuery>>,
  (typeof caseMembersMethods)[number]
>

export const caseMembersPath = 'case-members'

export const caseMembersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const caseMembersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(caseMembersPath, connection.service(caseMembersPath), {
    methods: caseMembersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [caseMembersPath]: CaseMembersClientService
  }
}
