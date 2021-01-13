
exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('cpf').notNull().unique()
        table.string('num_doc_identidade')
        table.string('tipo_doc_identidade')
        table.string('orgao_doc_identidade')
        table.string('nacionalidade')
        table.string('profissao')
        table.string('dt_nascimento').notNull()
        table.string('dt_identidade')
        table.string('genero')
        table.string('cidade')
        table.string('estado')
        table.string('pais')
        table.timestamps()
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers')
}
