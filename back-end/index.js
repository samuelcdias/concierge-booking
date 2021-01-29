const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const start_db = require('./config/initial_db_data')
const apiPort = process.env.PORT || 3150

app.db = db

db.migrate.latest()
    .then( () => {
        return db.seed.run()
        }
    )
    .then( () => {
        consign()
            .include('./config/passport.js')
            .then('./config/middlewares.js')
            .then('./api/helpers')
            .then('./api/validations')
            .then('./api')
            .then('./config/routes.js')
            .into(app)
        }
    )
    .then( () => {
        start_db(app)
        }
    )

app.listen(apiPort, () => {
    console.log('Back-end listening in port ' + apiPort)
})