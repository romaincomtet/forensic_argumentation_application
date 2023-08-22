// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cases', (table) => {
    table.increments('id')
    table.string('organisationName').notNullable()
    table.string('caseName').notNullable()
    table.string('caseNumber').notNullable()
    table.integer('organisationUserId').unsigned().notNullable().references('id').inTable('users')
    table.integer('managerUserId').unsigned().references('id').inTable('users')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cases')
}
