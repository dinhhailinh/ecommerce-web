const express = require('express')
const { requireLogin, checkAdmin } = require('../Middleware/checkAuth')
const { createCategory, getAllCategory } = require ('../controllers/categories')
const route = express.Router()

route.post('/create', requireLogin, checkAdmin, createCategory)
route.get('/', getAllCategory)

module.exports = route