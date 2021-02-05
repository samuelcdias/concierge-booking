module.exports = app => {
    const key = 'schedule AS s'
    const validate = app.api.validations.schedule.validate

    const save = async (req, res) => {
        const schedule = { ...req.body }

        if (req.params.date) {
            schedule.date = req.params.date
        }

        const msg = validate(schedule)
        if (msg) {
            return res.status(400).send(msg)
        }

        if(schedule.date) {
            app.db(key)
                .update('is_high_season', schedule.is_high_season)
                .where('date_day', schedule.date)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            return res.status(400).send('Requisição inválida, use outro método')
        }
    }

    const saveMany = async (req, res) => {
        const schedule = { ...req.body }
        const date_in = schedule.date_in
        const date_out = schedule.date_out
        
        if (date_in && date_out) {
            app.db
                .raw('SELECT sp_create_schedule(?, ?)', [date_in, date_out])
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            return res.status(400).send('Período não informado')
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1

        app.db(key)
            .innerJoin('rooms AS r', 's.room_id', 'r.id')
            .select('s.date', 's.is_high_season', 'r.room_number', 's.reservation_id')
            .whereRaw('extract(month from date_day) = extract(month from current_date) + ?', [page - 1])
            .orderBy('s.date_day', 'r.room_number')
            .then(schedule => res.json(schedule))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .innerJoin('rooms AS r', 's.room_id', 'r.id')
            .select('s.date_day', 's.is_high_season', 'r.room_number', 's.reservation_id')
            .where({date_day: req.params.date})
            .then(schedule => res.json(schedule))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
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
    
    return { save, saveMany, get, getById, remove }
}