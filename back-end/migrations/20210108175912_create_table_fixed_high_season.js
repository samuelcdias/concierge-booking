
exports.up = function (knex, Promise) {
  return knex.schema.createTable('high_season', table => {
    table.increments('id').primary()
    table.date('first_day').notNull()
    table.date('last_day')
    table.boolean('is_holiday').notNull()
    table.boolean('is_fixed').notNull().default(false)
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('high_season')

}
