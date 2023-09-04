// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('elements', (table) => {
    table.increments('id')

    table.string('name')
    table
      .integer('boardId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('boards')
      .onDelete('CASCADE')
      .index()

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('elements')
}
