const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
    
    app.route('/hotel')
        .all(app.config.passport.authenticate())
        .get(app.api.hotel.getById)
        .post(admin(app.api.hotel.save))
        .put(admin(app.api.hotel.save))
        .delete(admin(app.api.hotel.remove))

    app.route('/hospedes')
        .all(app.config.passport.authenticate())
        .post(app.api.hospede.save)
        .get(app.api.hospede.get)

    app.route('/hospedes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.hospede.getById)
        .put(app.api.hospede.save)
        .delete(admin(app.api.hospede.remove))

    app.route('/clientes')
        .all(app.config.passport.authenticate())
        .get(app.api.cliente.get)

    app.route('/clientes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.cliente.getById)
        .put(app.api.cliente.save)
        .delete(admin(app.api.cliente.remove))
    
    app.route('/agenda')
        .all(app.config.passport.authenticate())
        .get(app.api.agenda.get)
        .post(admin(app.api.agenda.save))

    app.route('/agenda/:data')
        .all(app.config.passport.authenticate())
        .get(app.api.agenda.getById)
        .put(admin(app.api.agenda.save))
        .delete(admin(app.api.agenda.remove))
    
    app.route('/quartos')
        .all(app.config.passport.authenticate())
        .get(app.api.quarto.get)
        .post(admin(app.api.quarto.save))

    app.route('/quartos/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.quarto.getById)
        .put(admin(app.api.quarto.save))
        .delete(admin(app.api.quarto.remove))
    
    app.route('/reservas')
        .post(app.api.reserva.save)
    
    app.route('/reservas')
        .all(app.config.passport.authenticate())
        .get(app.api.reserva.get)   

    app.route('/reservas/:data')
        .all(app.config.passport.authenticate())
        .get(app.api.reserva.getById)
        .put(admin(app.api.reserva.save))
        .delete(admin(app.api.reserva.remove))
    
    app.route('/reservasf')
        .get(app.api.reserva.filterByDate)
}