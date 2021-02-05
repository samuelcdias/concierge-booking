module.exports = app => {
    const { existsOrError } = app.api.helpers.validation

    const save = async (req, res) => {
        const hotel = { ...req.body }
        const useSNRHos = await app.api.config.getSNRHos(req.headers.authorization)

        if (req.params.id) {
            hotel.id = req.params.id
        }

        try {
            
            existsOrError(hotel.nome_fantasia, 'Nome não informado')
            if(useSNRHos){
                existsOrError(hotel.rede, 'Número de documento não informado')
                existsOrError(hotel.cadastro_mtur, 'Tipo de documento não informado')
                existsOrError(hotel.razao_social, 'Orgão expedidor não informado')
                existsOrError(hotel.cnpj, 'Nacionalidade não informada')
                existsOrError(hotel.tipo, 'Profissão não informada')
                existsOrError(hotel.categoria, 'Data de expedição do doc. de  identidade não informada')
                existsOrError(hotel.endereco, 'Genero não informado')
                existsOrError(hotel.municipio_uf, 'Cidade de origem não informada')
                existsOrError(hotel.telefone, 'Estado de origem não informado')
            }
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(hotel.id) {
            app.db('hoteis')
                .update(hotel)
                .where({id: hotel.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('hoteis')
                .insert(hotel)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        app.db('hoteis')
            .select('id', 'nome', 'cpf', 'dt_nascimento')
            .then(hoteis => res.json(hoteis))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('hoteis')
            .select('id', 'nome_fantasia')
            .where({id: req.params.id}).first()
            .then(hoteis => res.json(hoteis))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('hoteis')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Hotel não encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    

    return { save, get, getById,remove }
}