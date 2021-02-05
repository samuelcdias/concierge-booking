
exports.up = function(knex, Promise) {
    return knex.schema.createTable('configs', table => {
        table.integer('id').primary()
        table.boolean('useSNRHos').notNull().default(false)
        table.integer('limitViewsPage').default(20)
        table.integer('expirationTimeInHours').default(24)
        table.integer('scheduleTimeInMonths').default(24)
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('configs')
}
