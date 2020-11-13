
exports.up = function(knex, Promise) {
    return knex.schema.createTable('configs', table => {
        table.integer('id').primary() //Always used 999
        table.boolean('useSNRHos').notNull().default(false)
        table.integer('limitViewsPage').default(20)
        table.timestamps()
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('configs')
};
