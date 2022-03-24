const express = require('express')
const { requireLogin, checkAdmin } = require('../Middleware/checkAuth')
const { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory } = require ('../controllers/categories')
const route = express.Router()

route.post('/create', requireLogin, checkAdmin, createCategory)
route.get('/', getAllCategory)
route.get('/:slug', getOneCategory)
route.put('/update/:id', requireLogin, checkAdmin, updateCategory)
route.delete('/delete/:id', requireLogin, checkAdmin, deleteCategory)

module.exports = route
