
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('username').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('admin').notNull().default(false)
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
