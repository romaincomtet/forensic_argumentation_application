import { Ability, AbilityBuilder, createAliasResolver } from '@casl/ability'
import { User } from './client'

// don't forget this, as `read` is used internally
const resolveAction = createAliasResolver({
  update: 'patch', // define the same rules for update & patch
  read: ['get', 'find'], // use 'read' as a equivalent for 'get' & 'find'
  delete: 'remove' // use 'delete' or 'remove'
})

export const defineRulesFor = (user: User) => {
  // also see https://casl.js.org/v6/en/guide/define-rules
  const { can, cannot, rules } = new AbilityBuilder(Ability)

  //   if (user.role && user.role.name === 'SuperAdmin') {
  //     // SuperAdmin can do evil
  //     can('manage', 'all')
  //     return rules
  //   }

  //   if (user.role && user.role.name === 'Admin') {
  //     can('create', 'users')
  //   }

  //   ------------------------users------------------------

  can('read', 'users', { id: user.id })
  can('update', 'users', { id: user.id })
  cannot('delete', 'users')

  //   ------------------------cases------------------------
  if (user.isOrganisationUser) {
    can('create', 'cases')
  } else {
    cannot('create', 'cases').because('Only organisation users can create cases')
  }
  // TODO: need to check if user can see the case becuase part of the team
  can('read', 'cases')
  can('inviteMember', 'cases')
  can('editPermissionMember', 'cases')

  can('update', 'cases', { managerUserId: user.id })
  can('update', 'cases', { organisationUserId: user.id })

  //   ------------------------invitations------------------------
  can('read', 'invitations', { invitedBy: user.id })
  can('read', 'invitations', { userId: user.id })
  can('update', 'invitations', { userId: user.id })

  //   ------------------------case-members------------------------
  //   called by case in resolver

  //   ------------------------boards------------------------
  can('read', 'boards')
  can('create', 'boards')
  can('update', 'boards')
  can('remove', 'boards')

  //   can('manage', 'tasks', { userId: user.id })
  //   can('create-multi', 'posts', { userId: user.id })

  return rules
}

export const defineAbilitiesFor = (user: User) => {
  const rules = defineRulesFor(user)

  return new Ability(rules, { resolveAction })
}
