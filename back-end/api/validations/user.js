module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.helpers.validation

    const validate = async (user) => {
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.username, 'Nome de usuário não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const emailFromDB = await app.db('users')
                .where({ email: user.email }).first()

            const userFromDB = await app.db('users')
                .where({ username: user.username }).first()

            if (!user.id) {
                notExistsOrError(emailFromDB, 'Usuário já cadastrado')
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            return msg
        }
    }

    const validatePassword = async (user) => {
        try {
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ id: user.id }).first()

            existsOrError(userFromDB, 'Usuário não identificado')
            return userFromDB
        } catch (msg) {
            return msg
        }
    }

    return { validate, validatePassword }
}

