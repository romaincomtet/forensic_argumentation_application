// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'
import { get, set } from 'lodash'
import { ServiceTypes } from '../client'

interface IPullressource {
  service: keyof ServiceTypes
  idPath: string
  pathToPutRessourceInContext: string
}

export function pullRessource(...options: Array<IPullressource>) {
  return async (context: HookContext) => {
    await Promise.all(
      options.map(async (option) => {
        const id = get(context, option.idPath)
        const ressource = await context.app.service(option.service as any).get(id)
        set(context, option.pathToPutRessourceInContext, ressource)
      })
    )
    return context
  }
}
