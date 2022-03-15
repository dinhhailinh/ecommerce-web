const express = require('express')
const { requireLogin, checkAdmin } = require('../Middleware/checkAuth')
const { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = require('../controllers/products')
const route = express.Router()

route.post('/create', requireLogin, checkAdmin, createProduct)
route.get('', getProducts)
route.get('/:id', getOneProduct)
route.put('/update/:id', requireLogin, checkAdmin, updateProduct)
route.delete('/delete/:id', requireLogin, checkAdmin, deleteProduct)

module.exports = route