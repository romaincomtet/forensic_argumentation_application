// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  teamMembersDataValidator,
  teamMembersPatchValidator,
  teamMembersQueryValidator,
  teamMembersResolver,
  teamMembersExternalResolver,
  teamMembersDataResolver,
  teamMembersPatchResolver,
  teamMembersQueryResolver
} from './team-members.schema'

import type { Application } from '../../declarations'
import { TeamMembersService, getOptions } from './team-members.class'
import { teamMembersPath, teamMembersMethods } from './team-members.shared'
import { authorize } from 'feathers-casl'

export * from './team-members.class'
export * from './team-members.schema'

const authorizeHook = authorize({ adapter: '@feathersjs/mongodb' })

// A configure function that registers the service and its hooks via `app.configure`
export const teamMembers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(teamMembersPath, new TeamMembersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: teamMembersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(teamMembersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(teamMembersExternalResolver),
        schemaHooks.resolveResult(teamMembersResolver)
      ]
    },
    before: {
      all: [
        authorizeHook,
        schemaHooks.validateQuery(teamMembersQueryValidator),
        schemaHooks.resolveQuery(teamMembersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(teamMembersDataValidator),
        schemaHooks.resolveData(teamMembersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(teamMembersPatchValidator),
        schemaHooks.resolveData(teamMembersPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [teamMembersPath]: TeamMembersService
  }
}
