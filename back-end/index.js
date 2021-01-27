const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const apiPort = process.env.PORT || 3150

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
    console.log('Back-end listening in port ' + apiPort)
})