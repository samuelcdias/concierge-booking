const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')

module.exports = app => {
    app.use(helmet())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())
    app.use(logger('dev'))
}