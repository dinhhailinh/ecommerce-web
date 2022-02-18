const express = require('express')
const { createUser, getUser, loginUser, logout, updateProfile, changePassword, getAllUser, deleteUser } = require ('../controllers/user')
const { requireLogin, checkAdmin } = require('../Middleware/checkAuth')
const { validateRegisterRequest, validateLoginRequest, isRequestValidated } = require('../Middleware/validator')

const route = express.Router()

route.post('/register', validateRegisterRequest, isRequestValidated, createUser)
route.post('/login', validateLoginRequest, isRequestValidated, loginUser)
route.post('/logout', logout)
route.get('/info/:userId', requireLogin, getUser)
route.get('/all', requireLogin, checkAdmin, getAllUser)
route.put('/update', requireLogin, updateProfile)
route.put('/changePassword', requireLogin, changePassword)
route.delete('/delete', requireLogin, deleteUser)

module.exports = route