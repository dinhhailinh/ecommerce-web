const express = require('express')
const { upload } = require('../controllers/upload')
const { imageUpload } = require('../Middleware/upload')
const route = express.Router()

route.post('/', imageUpload.single('image'),upload)

module.exports = route