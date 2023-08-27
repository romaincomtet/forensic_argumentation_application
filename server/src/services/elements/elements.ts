// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  elementsDataValidator,
  elementsPatchValidator,
  elementsQueryValidator,
  elementsResolver,
  elementsExternalResolver,
  elementsDataResolver,
  elementsPatchResolver,
  elementsQueryResolver
} from './elements.schema'

import type { Application } from '../../declarations'
import { ElementsService, getOptions } from './elements.class'
import { elementsPath, elementsMethods } from './elements.shared'

export * from './elements.class'
export * from './elements.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const elements = (app: Application) => {
  // Register our service on the Feathers application
  app.use(elementsPath, new ElementsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: elementsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(elementsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(elementsExternalResolver),
        schemaHooks.resolveResult(elementsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(elementsQueryValidator),
        schemaHooks.resolveQuery(elementsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(elementsDataValidator),
        schemaHooks.resolveData(elementsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(elementsPatchValidator),
        schemaHooks.resolveData(elementsPatchResolver)
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
    [elementsPath]: ElementsService
  }
}
