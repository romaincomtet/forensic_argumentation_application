// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TeamMembers,
  TeamMembersData,
  TeamMembersPatch,
  TeamMembersQuery,
  TeamMembersService
} from './team-members.class'

export type { TeamMembers, TeamMembersData, TeamMembersPatch, TeamMembersQuery }

export type TeamMembersClientService = Pick<
  TeamMembersService<Params<TeamMembersQuery>>,
  (typeof teamMembersMethods)[number]
>

export const teamMembersPath = 'team-members'

export const teamMembersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const teamMembersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(teamMembersPath, connection.service(teamMembersPath), {
    methods: teamMembersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [teamMembersPath]: TeamMembersClientService
  }
}
