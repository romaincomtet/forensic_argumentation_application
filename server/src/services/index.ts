import { permissions } from './permissions/permissions'
import { teamMembers } from './team-members/team-members'
import { teams } from './teams/teams'
import { invitations } from './invitations/invitations'
import { cases } from './cases/cases'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(permissions)
  app.configure(teamMembers)
  app.configure(teams)
  app.configure(invitations)
  app.configure(cases)
  app.configure(user)
  // All services will be registered here
}
