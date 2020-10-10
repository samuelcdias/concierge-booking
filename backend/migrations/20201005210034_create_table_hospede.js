
exports.up = function(knex, Promise) {
    return knex.schema.createTable('hospedes', table => {
        table.increments('id').primary()
        table.boolean('is_responsavel').notNull().default(false)
        table.integer('clienteId').references('id').inTable('clientes').notNull()
        table.integer('reservaId').references('id').inTable('reservas').notNull()
        table.timestamps()
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hospedes')
};
