
exports.up = function(knex, Promise) {
    return knex.schema.createTable('quartos', table => {
        table.increments('id').primary()
        table.string('numero').notNull().unique()
        table.string('descricao').notNull()
        table.integer('nro_camas').notNull()
        table.string('tipo').notNull()
        table.string('image_url')
        table.integer('cama_extra')
        table.date('dt_limpeza')
        table.date('dt_manutencao')
        table.string('status')
        table.timestamps()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('quartos')
};
