const express = require('express')
const { createOrderItem, createOrder, updateOrderToPaid, updateOrderToDelivery, getOrdersIncome, getOrders, deletedOrder } = require('../controllers/order')
const { requireLogin, checkAdmin } = require('../Middleware/checkAuth')
const route = express.Router()

route.post('/create', requireLogin, createOrder)
route.post('/add-item', requireLogin, createOrderItem)
route.post('/pay/:id', updateOrderToPaid)
route.post('/update/:id', checkAdmin, updateOrderToDelivery)
route.get('/income', getOrdersIncome)
route.get('/all-order', getOrders)
route.delete('/delete/:id', requireLogin, deletedOrder)

module.exports = route