
module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/config')
        .get(app.api.config.get)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
    
    app.route('/hotel')
        .get(app.api.hotel.getById)
        .post(app.api.hotel.save)
        .put(app.api.hotel.save)
        .delete(app.api.hotel.remove)

    app.route('/hospedes')
        .post(app.api.hospede.save)
        .get(app.api.hospede.get)

    app.route('/hospedes/:id')
        .get(app.api.hospede.getById)
        .put(app.api.hospede.save)
        .delete(app.api.hospede.remove)

    app.route('/clientes')
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/:id')
        .get(app.api.cliente.getById)
        .put(app.api.cliente.save)
        .delete(app.api.cliente.remove)
    
    app.route('/agenda')
        .get(app.api.agenda.get)
        .post(app.api.agenda.save)

    app.route('/agenda/:data')
        .get(app.api.agenda.getById)
        .put(app.api.agenda.save)
        .delete(app.api.agenda.remove)
    
    app.route('/quartos')
        .get(app.api.quarto.get)
        .post(app.api.quarto.save)

    app.route('/quartos/:id')
        .get(app.api.quarto.getById)
        .put(app.api.quarto.save)
        .delete(app.api.quarto.remove)
    
    app.route('/reservas')
        .get(app.api.reserva.get)
        .post(app.api.reserva.save)

    app.route('/reservas/:data')
        .get(app.api.reserva.getById)
        .put(app.api.reserva.save)
        .delete(app.api.cliente.remove)
    
    app.route('/reservaf')
        .get(app.api.reserva.filterByDate)
}