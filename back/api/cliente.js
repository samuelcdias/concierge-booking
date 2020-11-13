module.exports = app => {
    const { existsOrError } = app.api.validation

    const { useSNRHos } = app.db('config')
        .select('useSNRHos')
        .where({id: 999}).first()
    
    const limit = 10

    const save = async (req, res) => {
        const cliente = { ...req.body }

        if (req.params.id) cliente.id = req.params.id
        try {
            
            existsOrError(cliente.nome, 'Nome não informado')
            existsOrError(cliente.cpf, 'CPF não informado')
            existsOrError(cliente.dt_nascimento, 'Data de nascimento não informada')
            if(useSNRHos){
                existsOrError(cliente.num_doc_identidade, 'Número de documento não informado')
                existsOrError(cliente.tipo_doc_identidade, 'Tipo de documento não informado')
                existsOrError(cliente.orgao_doc_identidade, 'Orgão expedidor não informado')
                existsOrError(cliente.nacionalidade, 'Nacionalidade não informada')
                existsOrError(cliente.profissão, 'Profissão não informada')
                existsOrError(cliente.dt_identidade, 'Data de expedição do doc. de  identidade não informada')
                existsOrError(cliente.genero, 'Genero não informado')
                existsOrError(cliente.cidade, 'Cidade de origem não informada')
                existsOrError(cliente.estado, 'Estado de origem não informado')
                existsOrError(cliente.pais, 'País de origem não informado')
                existsOrError(cliente.motivo_viagem, 'Motivo de viagem não informado')
                existsOrError(cliente.meio_transporte, 'Meio de transporte não informado')
            }
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(cliente.id) {
            app.db('clientes')
                .update(cliente)
                .where({id: cliente.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('clientes').count('id').first()
        const count = parseInt( result.count)

        app.db('clientes')
            .select('id', 'nome', 'cpf', 'dt_nascimento')
            .limit(limit).offset(page * limit - limit)
            .then(clientes => res.json({ data: clientes, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clientes')
            .select('id', 'nome', 'cpf', 'dt_nascimento')
            .where({id: req.params.id}).first()
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('clientes')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Cliente não encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    

    return { save, get, getById, remove }
}