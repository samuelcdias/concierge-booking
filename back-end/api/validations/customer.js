module.exports  = app => {
  const { existsOrError, notExistsOrError } = app.api.helpers.validation

  const validate = async (customer, useSNRHos, key, checkDB) => {
    try {    
      existsOrError(customer.nome, 'Nome não informado')
      existsOrError(customer.cpf, 'CPF não informado')
      existsOrError(customer.dt_nascimento, 'Data de nascimento não informada')
      if(useSNRHos){
          existsOrError(customer.num_doc_identidade, 'Número de documento não informado')
          existsOrError(customer.tipo_doc_identidade, 'Tipo de documento não informado')
          existsOrError(customer.orgao_doc_identidade, 'Orgão expedidor não informado')
          existsOrError(customer.nacionalidade, 'Nacionalidade não informada')
          existsOrError(customer.profissao, 'Profissão não informada')
          existsOrError(customer.dt_identidade, 'Data de expedição do doc. de  identidade não informada')
          existsOrError(customer.genero, 'Genero não informado')
          existsOrError(customer.cidade, 'Cidade de origem não informada')
          existsOrError(customer.estado, 'Estado de origem não informado')
          existsOrError(customer.pais, 'País de origem não informado')
      }
      
      if(checkDB) {
        const customerFromDB = await app.db(key)
          .where({ cpf: customer.cpf }).first()

        if (!customer.id) {
          notExistsOrError(customerFromDB, 'Cliente já cadastrado')
        }
      }
      
    } catch (msg){
      return msg
    } 
  }
  
  return { validate }  
}

