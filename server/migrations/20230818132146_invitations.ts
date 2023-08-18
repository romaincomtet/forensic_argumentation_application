// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('invitations', (table) => {
    table.increments('id')

    table.integer('invitedBy').unsigned().notNullable().references('id').inTable('users')
    table.integer('userId').unsigned().notNullable().references('id').inTable('users').index()
    table
      .integer('caseId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cases')
      .onDelete('CASCADE')
      .index()
    table
      .integer('teamId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE')
      .index()
    table.enu('status', ['pending', 'accepted', 'refused', 'canceled']).notNullable().defaultTo('pending')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('invitations')
}
