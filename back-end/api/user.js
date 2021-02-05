
module.exports = app => {  
    const key = 'users'
    const encryptPassword = app.api.helpers.encrypter.encrypter
    const validate = app.api.validations.user.validate
    const validatePassword = app.api.validations.user.validatePassword

    const save = async (req, res) => {
        const user = { ...req.body }

        if (req.params.id) {
            user.id = req.params.id
        }

        const msg = await validate(user)
        if (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db(key)
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            user.admin = false
            app.db(key)
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const changePassword = async (req, res) => {
        const user = { ...req.body }

        if (req.params.id) {
            user.id = req.params.id
            validatePassword(user)
        } else {
            return res.status(400).send('Usuário não identificado')
        }
        
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        app.db(key)
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db(key).count('id').first()
        const count = parseInt( result.count)
        const limit = await app.api.config.getLimitViews()

        app.db(key)
            .select('id', 'username', 'name', 'email', 'admin')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db(key)
            .select('id', 'username', 'name', 'email', 'admin')
            .where({id: req.params.id}).first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getById, changePassword }
}