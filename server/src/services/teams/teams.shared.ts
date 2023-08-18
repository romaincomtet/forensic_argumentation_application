// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Teams, TeamsData, TeamsPatch, TeamsQuery, TeamsService } from './teams.class'

export type { Teams, TeamsData, TeamsPatch, TeamsQuery }

export type TeamsClientService = Pick<TeamsService<Params<TeamsQuery>>, (typeof teamsMethods)[number]>

export const teamsPath = 'teams'

export const teamsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const teamsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(teamsPath, connection.service(teamsPath), {
    methods: teamsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [teamsPath]: TeamsClientService
  }
}
