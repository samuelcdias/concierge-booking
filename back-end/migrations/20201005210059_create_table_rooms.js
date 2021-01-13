
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rooms', table => {
        table.increments('id').primary()
        table.string('numero').notNull().unique()
        table.string('descricao').notNull()
        table.integer('nro_camas').notNull()
        table.string('tipo').notNull()
        table.string('image_url')
        table.integer('cama_extra').default(0)
        table.date('dt_limpeza')
        table.date('dt_manutencao')
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rooms')
}
