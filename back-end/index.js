const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const { apiPort } = require('./.env')

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/helpers')
    .then('./api/validations')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(apiPort, () => {
    console.log('Backend listening in port ' + apiPort)
})