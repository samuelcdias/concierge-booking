const admin = require('./admin')

module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/config')
        .get(app.api.config.get)
    
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

    app.route('/guests')
        .all(app.config.passport.authenticate())
        .post(app.api.guest.save)
        .get(app.api.guest.get)

    app.route('/guests/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.guest.getById)
        .put(app.api.guest.save)
        .delete(admin(app.api.guest.remove))

    app.route('/customers')
        .all(app.config.passport.authenticate())
        .get(app.api.customer.get)
        .post(app.api.customer.save)

    app.route('/customers/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.customer.getById)
        .put(app.api.customer.save)
        .delete(admin(app.api.customer.remove))
    
    app.route('/schedule')
        .all(app.config.passport.authenticate())
        .get(app.api.schedule.get)

    app.route('/schedule/config')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.schedule.saveMany))

    app.route('/schedule/:date')
        .all(app.config.passport.authenticate())
        .get(app.api.schedule.getById)
        .put(admin(app.api.schedule.save))
    
    app.route('/rooms')
        .all(app.config.passport.authenticate())
        .get(app.api.room.get)
        .post(admin(app.api.room.save))

    app.route('/rooms/:number')
        .all(app.config.passport.authenticate())
        .get(app.api.room.getById)
        .put(admin(app.api.room.save))
        .delete(admin(app.api.room.remove))

    app.route('/reservations')
        .post(app.api.reservation.save)
    
    app.route('/reservations')
        .all(app.config.passport.authenticate())
        .get(app.api.reservation.get)   
  
    app.route('/reservations/available-rooms')
        .get(app.api.reservation.filterByDate)

    app.route('/reservations/:data')
        .all(app.config.passport.authenticate())
        .get(app.api.reservation.getById)
        .put(admin(app.api.reservation.save))
        .delete(admin(app.api.reservation.remove))
}