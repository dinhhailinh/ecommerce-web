const Router = require('express').Router()
const env = require('dotenv')

const user = require ('./user')
const category = require ('./category')
const product = require ('./product')
const cartItem = require ('./cart')
const address = require ('./address')
const paymentType = require ('./paymentType')
const payment = require ('./payment')
const order = require ('./order')
env.config()

Router.use('/user', user)
Router.use('/paymentType', paymentType)
Router.use('/info', address)
Router.use('/category', category)
Router.use('/product', product)
Router.use('/cart', cartItem)
Router.use('/order', order)
Router.use('/payment', payment)

module.exports = Router