// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import {
  AuthenticationParams,
  AuthenticationRequest,
  AuthenticationService,
  JWTStrategy
} from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

import type { Application } from './declarations'
import { defineAbilitiesFor } from './authentication.abilities'
import { Params } from '@feathersjs/feathers'
import { NotAuthenticated } from '@feathersjs/errors'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class MyJWTStrategy extends JWTStrategy {
  async authenticate(authentication: AuthenticationRequest, params: AuthenticationParams) {
    const res = await super.authenticate(authentication, params)
    // Your additional logic here
    // @ts-ignore
    const { user } = res
    if (!user) return context
    const ability = defineAbilitiesFor(user)
    return { ...res, ability, rules: ability.rules } as any
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new MyJWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('authentication', authentication)
}
