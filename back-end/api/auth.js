
module.exports = app => {
    const decode = app.api.helpers.tokenizator.decode
    const encode = app.api.helpers.tokenizator.encode
    const compare = app.api.helpers.encrypter.compare

    const signin = async(req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }
        const user = await app.db('users')
            .where({ username: req.body.username })
            .first()
        
        if (!user) {
            return res.status(400).send('Usuário não encontrado')
        } 

        const isMatch = compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(400).send('username/senha inválidos')
        }
        const result = await app.db('configs').select('useSNRHos').first()
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            admin: user.admin,
            usesnrhos: result.useSNRHos,
            iat: now, 
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({ 
            ...payload,
            token: encode(payload)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = decode(userData.token)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
        }
        res.send(false)
    }

    return { signin, validateToken }
}