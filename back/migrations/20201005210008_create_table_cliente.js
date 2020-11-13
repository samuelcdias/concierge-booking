
exports.up = function(knex, Promise) {
    return knex.schema.createTable('clientes', table => {
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
        table.enu('motivo_viagem',['Lazer - Férias', 'Negócio','Congresso - Feira', 'Parentes - Amigos', 'Estudos - Cursos', 'Religião', 'Saúde', 'Compras', 'Outro'], { useNative: true, enumName: 'motivos_viagem'})
        table.enu('meio_transporte', ['Avião', 'Automóvel', 'Ônibus', 'Moto', 'Navio-Barco', 'Trem', 'Outro'], { seNative: true, enumName: 'meios_transporte'})
        table.timestamps()
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clientes')
};
