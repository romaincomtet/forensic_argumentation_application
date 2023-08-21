// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  invitationsDataValidator,
  invitationsPatchValidator,
  invitationsQueryValidator,
  invitationsResolver,
  invitationsExternalResolver,
  invitationsDataResolver,
  invitationsPatchResolver,
  invitationsQueryResolver,
  Invitations
} from './invitations.schema'

import type { Application } from '../../declarations'
import { InvitationsService, getOptions } from './invitations.class'
import { invitationsPath, invitationsMethods } from './invitations.shared'
import { disallow } from 'feathers-hooks-common'
import { authorize } from 'feathers-casl'

export * from './invitations.class'
export * from './invitations.schema'

const authorizeHook = authorize({ adapter: '@feathersjs/mongodb' })

// A configure function that registers the service and its hooks via `app.configure`
export const invitations = (app: Application) => {
  // Register our service on the Feathers application
  app.use(invitationsPath, new InvitationsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: invitationsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(invitationsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(invitationsExternalResolver),
        schemaHooks.resolveResult(invitationsResolver)
      ]
    },
    before: {
      all: [
        authorizeHook,
        schemaHooks.validateQuery(invitationsQueryValidator),
        schemaHooks.resolveQuery(invitationsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        disallow('external'),
        schemaHooks.validateData(invitationsDataValidator),
        schemaHooks.resolveData(invitationsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(invitationsPatchValidator),
        schemaHooks.resolveData(invitationsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      patch: [
        async (context) => {
          // here if invitation is accepted, we need to add user to case or team
          // @ts-ignore
          if (context?.id && context.result?.status === 'accepted') {
            const result = context.result as Invitations
            if (result.caseId && result.teamId) {
              // TODO: add team member to team
              // await context.app.service('teams').patch(result.teamId, {
              // })
            } else {
              await context.app.service('cases').patch(result.caseId, {
                managerUserId: result.userId
              })
            }
          }
        }
      ]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [invitationsPath]: InvitationsService
  }
}
