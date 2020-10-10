module.exports = app => {
    const { existsOrError } = app.api.validation

    const { limit } = app.db('config')
        .select('limitViewsPage')
        .where({id: 999}).first()
    
    const save = async (req, res) => {
        const hopede = { ...req.body }

        if (req.params.id) hopede.id = req.params.id
        try {
            
            existsOrError(hopede.clienteId, 'Cliente não informado')
            existsOrError(hopede.reservaId, 'Reserva não informada')
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(hopede.id) {
            app.db('hopedes')
                .update(hopede)
                .where({id: hopede.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('hopedes')
                .insert(hopede)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('clientes').count('id').first()
        const count = parseInt( result.count)

        app.db('hopedes')
            .innerJoin('clientes', 'hospedes.id', 'clientes.id')
            .select('hospedes.id', 'clientes.nome', 'hospedes.is_responsavel', 'clientes.dt_nascimento')
            .limit(limit).offset(page * limit - limit)
            .orderBy('reservaId')
            .groupBy('reservaId')
            .then(hopedes => res.json({ data: hopedes, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('hopedes')
            .innerJoin('clientes', 'hospedes.id', 'clientes.id')
            .select('hospedes.id', 'clientes.nome', 'hospedes.is_responsavel', 'clientes.dt_nascimento')
            .orderBy('clientes.nome')
            .where({reservaId: req.params.id})
            .then(hopedes => res.json(hopedes))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('hopedes')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Hóspede não encontrado')
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