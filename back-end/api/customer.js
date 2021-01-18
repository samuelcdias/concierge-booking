module.exports = app => {
    const model = app.config.models.customers
    const key = model.tablename
    const { existsOrError } = app.api.helpers.validation

    const save = async (req, res) => {
        const customer = { ...req.body }
        const useSNRHos = await app.api.helpers.config.getSNRHos()
        const validate = app.api.validations.customer.validate

        if (req.params.id) {
            customer.id = req.params.id
        }

        const msg = await validate(customer, useSNRHos)
        if (msg) {
            return res.status(400).send(msg)
        }

        if(customer.id) {
            app.db(key)
                .update(customer)
                .where({id: customer.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(key)
                .insert(customer)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db(key).count('id').first()
        const count = parseInt(result.count)
        const limit = await app.api.helpers.config.getLimitViews()

        app.db(key)
            .select('id', model.name, model.cpf, model.dt_birth)
            .limit(limit).offset(page * limit - limit)
            .orderBy(model.dt_name)
            .then(customers => res.json({ data: customers, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db(key)
            .select('id', model.name, model.cpf, model.dt_birth)
            .where({id: req.params.id}).first()
            .then(customers => res.json(customers))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db(key)
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