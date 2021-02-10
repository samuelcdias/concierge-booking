require("dotenv").config()

const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const start_db = require('./config/initial_db_data')
const apiPort = process.env.PORT

app.db = db
console.log('Updating migrations')
db.migrate.latest()
    .then( () => {
        console.log('Migrations updated')

        return db.seed.run()
        }
    )
    .then( () => {
        console.log('Starting app')
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
        console.log('App started')
        start_db(app)
            .then(() => console.log('Database checked'))
        
        }
    )

app.listen(apiPort, () => {
    console.log('Back-end listening in port ' + apiPort)
})