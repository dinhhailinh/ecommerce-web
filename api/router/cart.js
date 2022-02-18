const express = require('express')
const { createCart, getUserCart, updateCartItem } = require('../controllers/cart')
const { requireLogin } = require('../Middleware/checkAuth')

const route = express.Router()

route.post('/add', requireLogin, createCart)
route.get('/my', requireLogin, getUserCart)
route.put('/update/:cartId', requireLogin, updateCartItem)

module.exports = route