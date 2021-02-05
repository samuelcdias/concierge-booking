
exports.up = function(knex, Promise) {
  return knex.schema.createTable('guests', table => {
      table.increments('id').primary()
      table.boolean('is_responsavel').notNull().default(false)
      table.integer('customer_id').references('id').inTable('customers').notNull()
      table.integer('reservation_id').references('id').inTable('reservations').notNull()
      table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('guests')
}
