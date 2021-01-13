module.exports = app => {
    const key = 'guests'
    const { existsOrError } = app.api.helpers.validation
    
    
    const save = async (req, res) => {
        const guests = { ...req.body }

        if (req.params.id) {
            guests.id = req.params.id
        }
        
        try {
            existsOrError(guests.customer_id, 'Cliente não informado')
            existsOrError(guests.reserva_id, 'Reserva não informada')
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(guests.id) {
            app.db(key)
                .update(guests)
                .where({id: guests.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(key)
                .insert(guests)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const count = parseInt( result.count)
        const limit = await app.api.helpers.config.getLimitViews()

        app.db(key)
            .innerJoin('clientes', 'guests.id', 'clientes.id')
            .select('guests.id', 'clientes.nome', 'guests.is_responsavel', 'clientes.dt_nascimento')
            .orderBy('reserva_id')
            .groupBy('reserva_id')
            .then(guests => res.json({ data: guests, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .innerJoin('clientes AS c', 'guests.id', 'clientes.id')
            .select('guests.id', 'c.nome', 'guests.is_responsavel', 'c.dt_nascimento')
            .orderBy('c.nome')
            .where({reserva_id: req.params.id})
            .then(guests => res.json(guests))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
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