
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reservas', table => {
        table.increments('id').primary()
        table.string('codigo')
        table.date('dt_entrada_reserva').notNull()
        table.date('dt_saida_reserva').notNull()
        table.datetime('hora_entrada')
        table.datetime('hora_saida')
        table.string('forma_pagamento').notNull()
        table.float('tarifa').notNull()
        table.boolean('no-show').default(true)
        table.string('obs')
        table.timestamps()
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reservas')
};
