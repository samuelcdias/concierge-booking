module.exports  = app => {
  const { existsOrError } = app.api.helpers.validation

  const validate = (customer, useSNRHos) => {
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
          existsOrError(customer.motivo_viagem, 'Motivo de viagem não informado')
          existsOrError(customer.meio_transporte, 'Meio de transporte não informado')
      }
    } catch (msg){
      return msg
    } 
  }
  
  return { validate }  
}

