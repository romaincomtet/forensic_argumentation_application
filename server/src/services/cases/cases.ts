// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  casesDataValidator,
  casesPatchValidator,
  casesQueryValidator,
  casesResolver,
  casesExternalResolver,
  casesDataResolver,
  casesPatchResolver,
  casesQueryResolver,
  casesMemberDataValidator,
  casesMemberDataResolver
} from './cases.schema'

import type { Application } from '../../declarations'
import { CasesService, getOptions } from './cases.class'
import { casesPath, casesMethods } from './cases.shared'
import { pullRessource } from '../../hooks/pull-ressource'
import { authorize } from 'feathers-casl'

export * from './cases.class'
export * from './cases.schema'
const authorizeHook = authorize({ adapter: '@feathersjs/mongodb' })

// A configure function that registers the service and its hooks via `app.configure`
export const cases = (app: Application) => {
  // Register our service on the Feathers application
  app.use(casesPath, new CasesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: casesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(casesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(casesExternalResolver),
        schemaHooks.resolveResult(casesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(casesQueryValidator), schemaHooks.resolveQuery(casesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(casesDataValidator), schemaHooks.resolveData(casesDataResolver)],
      patch: [schemaHooks.validateData(casesPatchValidator), schemaHooks.resolveData(casesPatchResolver)],
      remove: [],
      inviteMember: [
        schemaHooks.validateData(casesMemberDataValidator),
        schemaHooks.resolveData(casesMemberDataResolver)
      ]
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
    [casesPath]: CasesService
  }
}
