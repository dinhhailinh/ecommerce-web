const express = require('express')
const { payment, paySuccess } = require('../controllers/payment')

const route = express.Router()

route.get('/', payment)
route.post('/create-order', paySuccess)
// route.get('/cancel', (req, res) => res.send('Cancelled'))

module.exports = route
