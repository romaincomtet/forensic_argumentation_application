// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  caseMembersDataValidator,
  caseMembersPatchValidator,
  caseMembersQueryValidator,
  caseMembersResolver,
  caseMembersExternalResolver,
  caseMembersDataResolver,
  caseMembersPatchResolver,
  caseMembersQueryResolver
} from './case-members.schema'

import type { Application } from '../../declarations'
import { CaseMembersService, getOptions } from './case-members.class'
import { caseMembersPath, caseMembersMethods } from './case-members.shared'
import { disallow } from 'feathers-hooks-common'
import { authorize } from 'feathers-casl'

export * from './case-members.class'
export * from './case-members.schema'

const authorizeHook = authorize({})
// A configure function that registers the service and its hooks via `app.configure`
export const caseMembers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(caseMembersPath, new CaseMembersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: caseMembersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(caseMembersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(caseMembersExternalResolver),
        schemaHooks.resolveResult(caseMembersResolver)
      ]
    },
    before: {
      all: [
        authorizeHook,
        schemaHooks.validateQuery(caseMembersQueryValidator),
        schemaHooks.resolveQuery(caseMembersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        disallow('external'),
        schemaHooks.validateData(caseMembersDataValidator),
        schemaHooks.resolveData(caseMembersDataResolver)
      ],
      patch: [
        disallow('external'),
        schemaHooks.validateData(caseMembersPatchValidator),
        schemaHooks.resolveData(caseMembersPatchResolver)
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
    [caseMembersPath]: CaseMembersService
  }
}
