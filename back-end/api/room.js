module.exports = app => {
    const key = 'rooms'
    const { existsOrError } = app.api.helpers.validation
    const validate = app.api.validations.room.validate
    const setChangesInRoom = app.api.helpers.roomChangeSave.changeRoom


    const save = async (req, res) => {
        const room = { ...req.body }
            
        const msg = await validate(room, key)
        if (msg) {
            return res.status(400).send(msg)
        }

        if (room.id) {
            const data = setChangesInRoom(room)

            if (room.settings) {
                app.db('schedule')
                .update('status', data.period.status)
                .where(data.period.up)
                .then()
                .catch(err => res.status(500).send(err))
            }

            app.db(key)
                .update(data.room_data)
                .where({id: room.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(key)
                .insert(room)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db(key).count('id').first()
        const count = parseInt( result.count)
        const limit = await app.api.config.getLimitViews()
        
        app.db(key)
            .select('id','room_number', 'description', 'type_of_room', 'image_url')
            .limit(limit).offset(page * limit - limit)
            .orderBy('room_number')
            .then(rooms => res.json({ data: rooms, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .select('id',
                'room_number',
                'description',
                'number_of_beds',
                'type_of_room',
                'image_url',
                'number_of_extra_beds',
                'dt_last_cleaning',
                'dt_last_maintenance')
            .where('room_number', req.params.number).first()
            .then(rooms => res.json(rooms))
            .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
                .where(number, req.params.number).del()

            try {
                existsOrError(rowsDeleted,'Quarto não encontrado')
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