// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Invitations,
  InvitationsData,
  InvitationsPatch,
  InvitationsQuery,
  InvitationsService
} from './invitations.class'

export type { Invitations, InvitationsData, InvitationsPatch, InvitationsQuery }

export type InvitationsClientService = Pick<
  InvitationsService<Params<InvitationsQuery>>,
  (typeof invitationsMethods)[number]
>

export const invitationsPath = 'invitations'

export const invitationsMethods = [
  'find',
  'get',
  'create',
  'patch',
  'remove',
  'ManagerCancelInvitation'
] as const

export const invitationsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(invitationsPath, connection.service(invitationsPath), {
    methods: invitationsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [invitationsPath]: InvitationsClientService
  }
}
