
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rooms', table => {
        table.increments('id').primary()
        table.string('room_number').notNull().unique()
        table.string('description').notNull()
        table.integer('number_of_beds').notNull()
        table.string('type_of_room').notNull()
        table.string('image_url')
        table.integer('number_of_extra_beds').default(0)
        table.date('dt_last_cleaning')
        table.date('dt_last_maintenance')
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rooms')
}
