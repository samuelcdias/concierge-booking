module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const agenda = { ...req.body }

        if (req.params.id) agenda.id = req.params.id
        try {
            
            existsOrError(agenda.data, 'Data não informada')
            existsOrError(agenda.is_alta_temporada, 'Tipo de tempodara não informado')
            existsOrError(agenda.quartoId, 'Quarto não informado')
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(agenda.id) {
            app.db('agendas')
                .update(agenda)
                .where({id: agenda.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('agendas')
                .insert(agenda)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('clientes').count('id').first()
        const count = parseInt( result.count)

        app.db('agendas AS a')
            .innerJoin('quartos AS q', 'agendas.id', 'quartos.id')
            .select('a.data', 'a.is_alta_temporada', 'q.numero', 'a.reservaId')
            .limit(limit).offset(page * limit - limit)
            .orderBy('a.data', 'q.numero')
            .groupBy('a.data')
            .then(agendas => res.json({ data: agendas, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('agendas')
            .innerJoin('quartos AS q', 'agendas.id', 'quartos.id')
            .select('a.data', 'a.is_alta_temporada', 'q.numero', 'a.reservaId')
            .where({data: req.params.data})
            .then(agendas => res.json(agendas))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('agendas')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Data não encontrada')
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