import { caseMembers } from './case-members/case-members'
import { invitations } from './invitations/invitations'
import { cases } from './cases/cases'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(caseMembers)
  app.configure(invitations)
  app.configure(cases)
  app.configure(user)
  // All services will be registered here
}
