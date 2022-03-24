const express = require('express')
const { createAddress, getUserAddress } = require('../controllers/address')

const { requireLogin } = require('../Middleware/checkAuth')

const route = express.Router()

route.post('/new', requireLogin, createAddress)
route.get('/', requireLogin, getUserAddress)

module.exports = route
