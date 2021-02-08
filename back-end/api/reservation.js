module.exports = app => {
    const key = 'vreservations'
    const { existsOrError } = app.api.helpers.validation
    
    const save = async (req, res) => {
        const reservation = { ...req.body.reservation }
        const room_type = req.body.roomSelected
        const customers_list = req.body.customerList
        const validateReservation = app.api.validations.reservation.validate
        const validateCustomer = app.api.validations.customer.validate
        const useSNRHos = await app.api.config.getSNRHos(req.headers.authorization)

        if (req.params.code) {
            reservation.code = req.params.code
        } 
        
        try {
            await customers_list.forEach(async (customer) => {
                const msg = await validateCustomer(customer, false, 'customers', false)
                if (msg) {
                    throw msg
                }
            })
        } catch (msg) {
            res.status(400).send(msg)
        }

        const msg = await validateReservation(reservation, room_type, useSNRHos)
        if (msg) {
            return res.status(400).send(msg)
        }

        if(reservation.id) {
            app.db(key)
                .update(reservation)
                .where({id: reservation.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db.raw('SELECT sp_make_reservation FROM sp_make_reservation(?,?,?);', [JSON.stringify(reservation), room_type, JSON.stringify(customers_list)])
                .then(result => {
                    console.log(result)
                    if(result.rows[0].sp_make_reservation) {
                        res.status(204).end()
                    } else {
                        res.status(400).send('Código inválido! Tente novamente.')
                    }
                })
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db(key).count('id').first()
        const count = parseInt(result.count)
        const limit = await app.api.config.getLimitViews()

        app.db(key)
            .select('codigo', 'dt_entrada_reserva', 'dt_saida_reserva', 'hora_entrada','hora_saida', 'obs')
            .distinct()
            .limit(limit).offset(page * limit - limit)
            .debug().then(reservations => res.json({ data: reservations, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .innerJoin('hospedes AS h', 'r.id', 'h.id')
            .innerJoin('clientes AS c', 'h.id', 'c.id')
            .select('r.id', 'r.codigo', 'r.dt_entrada_reserva','r.dt_saida_reserva', 'r.tarifa','r.obs','c.nome', 'c.dt_nascimento')
            .where({codigo: req.params.id}).first()
            .then(reservation => res.json(reservation))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted,'Reserva não encontrada')
            } catch(msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const filterByDate = async (req, res) => {     
        app.db.raw('SELECT type_of_room, description, image_url from sp_filter_room(?, ?);', [req.query.in, req.query.out])
            .then(rooms => res.json(rooms.rows))
            .catch(err => res.status(500).send(err))
    }
  
    return { save, get, getById, filterByDate, remove }
}