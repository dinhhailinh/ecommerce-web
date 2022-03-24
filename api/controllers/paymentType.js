const { Payments } = require('../models')

const createPaymentType = async(req, res) => {
    const {paymentType} = req.body
    try {
        const check = Payments.findOne({
            where: {paymentType: paymentType},
            attributes: ['paymentType']
        })
        if (check.paymentType) {
            res.status(501).json('this payment type has bess exist')
        } else {
            const payment = await Payments.create({
                paymentType: paymentType
            })
            res.status(201).json({
                payment
            })
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
}

const getPaymentType = async(req, res) => {
    try {
        const getPaymentType = await Payments.findAll({
            attributes: ['id','paymentType']
        })
        res.status(201).json({
            getPaymentType
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = { createPaymentType, getPaymentType }
