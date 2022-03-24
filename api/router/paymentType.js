const express = require('express')
const { getPaymentType, createPaymentType } = require('../controllers/paymentType')

const { checkAdmin, requireLogin } = require('../Middleware/checkAuth')

const route = express.Router()

route.post('/create', requireLogin, checkAdmin, createPaymentType)
route.get('/', getPaymentType)

module.exports = route
