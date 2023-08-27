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
  Invitations,
  invitationsCancelValidator,
  invitationsCancelResolver
} from './invitations.schema'

import type { Application } from '../../declarations'
import { InvitationsService, getOptions } from './invitations.class'
import { invitationsPath, invitationsMethods } from './invitations.shared'
import { disallow } from 'feathers-hooks-common'
import { authorize } from 'feathers-casl'

export * from './invitations.class'
export * from './invitations.schema'

const authorizeHook = authorize()

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
        schemaHooks.validateQuery(invitationsQueryValidator),
        schemaHooks.resolveQuery(invitationsQueryResolver)
      ],
      find: [authorizeHook],
      get: [authorizeHook],
      create: [
        disallow('external'),
        schemaHooks.validateData(invitationsDataValidator),
        schemaHooks.resolveData(invitationsDataResolver)
      ],
      patch: [
        authorizeHook,
        schemaHooks.validateData(invitationsPatchValidator),
        schemaHooks.resolveData(invitationsPatchResolver)
      ],
      remove: [disallow('external')],
      ManagerCancelInvitation: [
        authorizeHook,
        schemaHooks.validateData(invitationsCancelValidator),
        schemaHooks.resolveData(invitationsCancelResolver)
      ]
    },
    after: {
      all: [],
      patch: [
        async (context) => {
          // here if invitation is accepted, we need to add user to case or team
          // @ts-ignore
          if (context?.id && context.result?.status === 'accepted') {
            const result = context.result as Invitations
            if (result.caseId && !result.isManager) {
              await context.app.service('case-members').create({
                caseId: result.caseId,
                userId: result.userId,
                permissionJson: {}
              })
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
