const paypal = require('paypal-rest-sdk')
const paypalConfig = require('../config/paypal')
const { Orders, OrderDetails, Products } = require('../models')

paypal.configure(paypalConfig)
const payment = async(req, res) => {
    // const sum = req.body.sum
    // create_payment = {
    //     "intent": "sale",
    //     "payer": {
    //         "payment_method": "paypal"
    //     },
    //     "redirect_urls": {
    //         "return_url": "http://localhost:5000/api/payment/",
    //         "cancel_url": "http://localhost:5000/api/payment/cancel"
    //     },
    //     "transactions": [{
    //         "amount": {
    //             "currency": "USD",
    //             "total": sum
    //         },
    //         "description": "Successful."
    //     }]
    // }
    // paypal.payment.create(create_payment, (error, payment) => {
    //     if (error) {
    //         res.status(500).json(error)
    //     } else {
    //         for(let i = 0;i < payment.links.length;i++){
    //             if(payment.links[i].rel === 'approval_url'){
    //                 res.redirect(payment.links[i].href);
    //             }
    //         }
    //     }
    // })
    res.send(process.env.PAYPAL_CLIENT_ID)
    
}
const paySuccess = async(req, res) => {
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId

    try {
        const sum = await OrderDetails.findAll({
            where: {OrderId: "50b6385d-0cb6-46a5-bbc7-be27fe815c2a"},
            attributes: ['sum']
        })
        res.json(sum)
        console.log(sum.sum);
    
        sum.sum.reduce(a,0)
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": sum
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.status(200).json('Success');
            }
        });
    } catch (error) {
            
    }
}

module.exports = { payment, paySuccess }
