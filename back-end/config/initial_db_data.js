module.exports = async (app) => {  
    console.log('Checking database')
    const result = await app.db('users').count('id').first()

    if (parseInt(result.count) === 0) {
        console.log('Iniciando cadastro de dados')
        const requirePassword = process.env.AUTH_SECRET
        const password = requirePassword.split('').splice(0,10).reverse().join('') 

        const user = {
            id: 1,
            name: 'Admin User',
            username: 'admin',
            password: password,
            confirmPassword: password,
            admin: true,
            email: 'email@email.com'
        }
    
        let req = {
            body: user,
            params: {},
            query: {}
        }

        const make_res = () => {
            const res = {}
            res.status = (status) => {
                res.status_value = status
                return res
            }
            res.json = (obJSON) => {
                res.text = obJSON
                return res
            }
            res.send = (err) => {
                res.erro = err
                return res
            }
            return res
        }

        console.log('Inserindo dados de amostra')
        await app.db.raw('SELECT sp_first_use()')
            .then(res => console.log('is_first_use: ' + (res.rows[0].sp_first_use ? 'yes' : 'no')))
            .catch(res => console.log(res))
             
        await app.api.user.save(req, make_res())
            .then(() => console.log('Cadastro finalizado'))
    }
}