// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  teamsDataValidator,
  teamsPatchValidator,
  teamsQueryValidator,
  teamsResolver,
  teamsExternalResolver,
  teamsDataResolver,
  teamsPatchResolver,
  teamsQueryResolver
} from './teams.schema'

import type { Application } from '../../declarations'
import { TeamsService, getOptions } from './teams.class'
import { teamsPath, teamsMethods } from './teams.shared'
import { disallow } from 'feathers-hooks-common'

export * from './teams.class'
export * from './teams.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const teams = (app: Application) => {
  // Register our service on the Feathers application
  app.use(teamsPath, new TeamsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: teamsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(teamsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(teamsExternalResolver),
        schemaHooks.resolveResult(teamsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(teamsQueryValidator), schemaHooks.resolveQuery(teamsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(teamsDataValidator), schemaHooks.resolveData(teamsDataResolver)],
      patch: [
        disallow(),
        schemaHooks.validateData(teamsPatchValidator),
        schemaHooks.resolveData(teamsPatchResolver)
      ],
      remove: [disallow()]
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
    [teamsPath]: TeamsService
  }
}
