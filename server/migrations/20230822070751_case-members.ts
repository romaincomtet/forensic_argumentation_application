// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('case-members', (table) => {
    table.primary(['caseId', 'userId'])

    table
      .integer('caseId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cases')
      .onDelete('CASCADE')
      .index()
    table.integer('userId').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.jsonb('permissionJson').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('case-members')
}
