
exports.up = function(knex, Promise) {
    return knex.schema.createTable('hotels', table => {
        table.increments('id').primary()
        table.string('rede')
        table.string('cadastro_mtur')
        table.string('razao_social')
        table.string('cnpj')
        table.string('nome_fantasia').notNull()
        table.string('tipo')
        table.string('categoria')
        table.string('endereco')
        table.string('municipio_uf')
        table.string('telefone')
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hotels')
}
