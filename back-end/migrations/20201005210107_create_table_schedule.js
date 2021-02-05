
exports.up = function(knex, Promise) {
    return knex.schema.createTable('schedule', table => {
        table.increments('id').primary()
        table.date('date_day').notNull()
        table.boolean('is_high_season').notNull().default(false)
        table.integer('room_id').notNull().references('id').inTable('rooms')
        table.integer('reservation_id').references('id').inTable('reservations')
        table.string('status')
        table.unique(['date_day', 'room_id'])
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule')
}
