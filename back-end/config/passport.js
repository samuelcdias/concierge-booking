const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payLoad, done) => {
        app.db('users')
            .where({ id: payLoad.id })
            .first()
            .then(user => done(null, user ? { ...payLoad } : false))
            .catch(err => done(err, false))
    })
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}
