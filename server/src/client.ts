// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { permissionsClient } from './services/permissions/permissions.shared'
export type {
  Permissions,
  PermissionsData,
  PermissionsQuery,
  PermissionsPatch
} from './services/permissions/permissions.shared'

import { teamMembersClient } from './services/team-members/team-members.shared'
export type {
  TeamMembers,
  TeamMembersData,
  TeamMembersQuery,
  TeamMembersPatch
} from './services/team-members/team-members.shared'

import { teamsClient } from './services/teams/teams.shared'
export type { Teams, TeamsData, TeamsQuery, TeamsPatch } from './services/teams/teams.shared'

import { invitationsClient } from './services/invitations/invitations.shared'
export type {
  Invitations,
  InvitationsData,
  InvitationsQuery,
  InvitationsPatch
} from './services/invitations/invitations.shared'

import { casesClient } from './services/cases/cases.shared'
export type { Cases, CasesData, CasesQuery, CasesPatch } from './services/cases/cases.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the server app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(casesClient)
  client.configure(invitationsClient)
  client.configure(teamsClient)
  client.configure(teamMembersClient)
  client.configure(permissionsClient)
  return client
}
