module.exports = app => {
    const key = 'schedule AS s'
    const validate = app.api.validations.schedule

    const save = async (req, res) => {
        const schedule = { ...req.body }

        if (req.params.id) {
            schedule.id = req.params.id
        }

        try {         
            validate(schedule)
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(schedule.id) {
            app.db(key)
                .update(schedule)
                .where({id: schedule.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(key)
                .insert(schedule)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const saveMany = async (req, res) => {
        const schedule = { ...req.body }
        const date_in = schedule.date_in
        const date_out = schedule.date_out
        
        if (date_in && date_out) {
            app.db
                .raw(`SELECT sp_update_schedule(??, ??)`, [date_in, date_out])
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            return res.status(400).send('Período não informado')
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db(key).count('id').first()
        const count = parseInt(result.count)
        const limit = app.api.helpers.config.getLimitViews()

        app.db(key)
            .innerJoin('rooms AS r', 's.id', 'r.id')
            .select('s.data_dia', 's.is_alta_temporada', 'r.numero', 's.reserva_id')
            .limit(limit).offset(page * limit - limit)
            .orderBy('s.data_dia', 'r.numero')
            .groupBy('s.data_dia')
            .then(agendas => res.json({ dataDia: agendas, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .innerJoin('rooms AS r', 's.id', 'r.id')
            .select('s.data_dia', 's.is_alta_temporada', 'q.numero', 's.reserva_id')
            .where({data_dia: req.params.data_dia})
            .then(agendas => res.json(agendas))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'dataDia não encontrada')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    
    return { save, saveMany, get, getById, remove }
}