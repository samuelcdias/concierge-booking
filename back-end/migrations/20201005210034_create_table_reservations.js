
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reservations', table => {
      table.increments('id').primary()
      table.string('codigo').notNull().unique()
      table.date('dt_entrada_reserva').notNull()
      table.date('dt_saida_reserva').notNull()
      table.datetime('hora_entrada')
      table.datetime('hora_saida')
      table.string('forma_pagamento').notNull()
      table.float('tarifa').notNull()
      table.boolean('no_show').default(true)
      table.string('obs')
      table.enu('motivo_viagem', ['Lazer - Férias', 'Negócio', 'Congresso - Feira', 'Parentes - Amigos', 'Estudos - Cursos', 'Religião', 'Saúde', 'Compras', 'Outro'], { useNative: true, enumName: 'motivos_viagem'})
      table.enu('meio_transporte', ['Avião', 'Automóvel', 'Ônibus', 'Moto', 'Navio-Barco', 'Trem', 'Outro'], { useNative: true, enumName: 'meios_transporte'})
      table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reservations').raw(`
    DROP TYPE meios_transporte;
    DROP TYPE motivos_viagem;
  `)
          
}
