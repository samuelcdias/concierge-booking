const room = require("./room")

module.exports = app => {
    const model = app.config.models.schedule
    const roomModel = app.config.models.rooms
    const key = model.tablename + ' AS s'
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
                .update(model.is_high_season, schedule.is_high_season)
                .where(model.date, schedule.date)
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
            .innerJoin(roomModel.tablename +  'AS r', 's.' + model.room_id, 'r.id')
            .select('s.' + model.date, 's.' + model.is_high_season, 'r.' + roomModel.number, 's.' + model.reservation_id)
            .whereRaw('extract(month from ' + model.date + ') = extract(month from current_date) + ?', [page - 1])
            .orderBy('s.' + model.date, 'r.' + roomModel.number)
            .then(schedule => res.json(schedule))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .innerJoin(roomModel.tablename +  'AS r', 's.' + model.room_id, 'r.id')
            .select('s.' + model.date, 's.' + model.is_high_season, 'r.' + roomModel.numero, 's.' + model.reservation_id)
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