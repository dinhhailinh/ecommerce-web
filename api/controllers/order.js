const Sequelize = require('sequelize');
const {Orders, OrderDetails, Products, Payments} = require('../models')

const Op = Sequelize.Op

const createOrder = async (req, res) => {
    const {AddressId, PaymentId} = req.body
    try {
        const order = await Orders.create({
            UserId: req.user.id,
            AddressId: AddressId,
            PaymentId: PaymentId
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

const createOrderItem = async (req, res) => {
    const {ProductId, quantity, size, OrdersId, color} = req.body
    try {
        const findProduct = await Products.findOne({where: 
            {
                id: ProductId
            },
        })
        const sum = findProduct.price * quantity
        const checkItem = await OrderDetails.findOne({
            where: {
                UserId: req.user.id,
                OrdersId: OrdersId,
                ProductId: ProductId,
                color: color
            },
            attributes: ['id','quantity']
        })
        if(checkItem){
            const update = await checkItem.update({
                quantity: checkItem.quantity + quantity,
                sum: findProduct.price * (checkItem.quantity + quantity)
            })
            await update.save()
            res.status(200).json(update) 
        }
        else{
            const detail = await OrderDetails.create({
                UserId: req.user.id,
                OrdersId: OrdersId,
                ProductId: ProductId, 
                quantity: quantity, 
                size: size,
                color: color,
                sum: sum
            })
            res.status(200).json(detail)
        }

        const searchOrderDetail = await OrderDetails.findAll({
            where: {
                OrdersId: OrdersId
            },
            attributes: [[Sequelize.fn('sum', Sequelize.col('sum')), 'sum']]
        })

        const findOrder = await Orders.findOne({
            where: {
                id: OrdersId
            }
        })
        const updateOrder = await findOrder.update({
            total: searchOrderDetail[0].sum
        })
        await updateOrder.save()
        const soldNum = findProduct.sold + checkItem.quantity
        console.log(soldNum);
        if(updateOrder){
            const updateProduct = await findProduct.update({
                sold: soldNum,
                quantity: findProduct.quantity - quantity
            })
            await updateProduct.save()
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
const updateOrderToPaid = async (req, res) => {
    try {
        const findOrder = await Orders.findOne({
            where: {id: req.params.id},
            include: { model: Payments, as: 'payment', attributes: ['paymentType'] }
        })
        const updateOrder = await findOrder.update({
            paid: true,
            paymentAt: new Date()
        })
        await updateOrder.save();
        res.status(200).json('Payment success')
    } catch (error) {
        res.status(400).json(error)
    }
}
const updateOrderToDelivery = async (req, res) => {
    try {
        const findOrder = await Orders.findOne({
            where: {id: req.params.id},
            include: { model: Payments, as: 'payment', attributes: ['paymentType'] }
        })
        if(findOrder.payment.paymentType === 'PayPal'){
            const updateOrder = await findOrder.update({
                status: 'Success',
                shippingAt: new Date()
            })
            await updateOrder.save()
        }
        else {
            const updateOrder = await findOrder.update({
                status: 'Success',
                shippingAt: new Date(),
                paid: true,
                paymentAt: new Date()
            })
            await updateOrder.save()
        }
        res.status(200).json(findOrder)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getOrdersIncome = async (req, res) => {
    try {
        const date = new Date()
        const currentStartMonth = new Date(date.getMonth()+ 1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
        const currentStartTime = date.getFullYear() + '-' + currentStartMonth
        const previousEndTime = currentStartTime
        const previousStartMonth = new Date(date.getMonth() + 1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
        function GetEndMonth (currentStartMonth) {
            let currentEndMonth = '0'
            if (currentStartMonth < 12) {
                currentEndMonth = Number(currentStartMonth + 1) < 10 ? '0' + Number(currentStartMonth + 1) : Number(currentStartMonth + 1)
            } else {
                currentEndMonth = '01'
            }
            return currentEndMonth
        }

        function GetStartMonth (month) {
            let previousStartMonth = '0'
            if (month > 0) {
                previousStartMonth = new Date(date.getMonth()) < 10 ? '0' + (date.getMonth()) : (date.getMonth())
            } else {
                previousStartMonth = '12'
            }
            return previousStartMonth
        }
        const currentEndYear = currentStartMonth == '12' ? (Number(date.getFullYear()) + 1).toString() : date.getFullYear()
        const currentEndTime = currentEndYear + '-' + GetEndMonth(Number(currentStartMonth))
        
        const previousStartYear = currentStartMonth == '01' ? (Number(date.getFullYear()) - 1).toString() : date.getFullYear()
        const previousStartTime = previousStartYear + '-'+ GetStartMonth(Number(previousStartMonth)-1)
        
        console.log(previousStartTime)
        const ordersCurrentMonth = await Orders.findAndCountAll({
            where: {
                updatedAt: {
                    [Op.between]: [currentStartTime, currentEndTime]
                },
                status: 'Success'
            },
            attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'Total']]
        })
        const ordersPreviousMonth = await Orders.findAndCountAll({
            where: {
                updatedAt: {
                    [Op.between]: [previousStartTime, previousEndTime]
                },
                status: 'Success'
            },
            attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'Total']]
        })
        const result = {
            previous: ordersPreviousMonth,
            current: ordersCurrentMonth
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getOrders = async (req, res) => {
    const {status} = res.query
    const limit = Number(req.query.limit) || 20
    const pageNum = Number(req.query.pageNum) || 1
    const page = limit * (pageNum - 1)

    const condition = {}
    if (status) {
        condition.status = status
    }   
    const orders = await Orders.findAll({
        where: condition,
        include: { model: Payments, as: 'payment', attributes: ['paymentType'] },
        attributes: ['id', 'total', 'status', 'paid', 'paymentAt'],
        limit: limit,
        offset: page
    })
    res.status(orders)
}

const getOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetails.findOne({
            where: {OrderId: req.params.id},
            include: { model: Products, as: 'products', attributes: ['productImage, title', 'price']},
            attributes: ['quantity', 'sum', 'color']
        })
        res.status(200).json(orderDetail)
    } catch (error) {
        
    }
}

const getYourOrderDetail = async (req, res) => {
    try {
        const orderDetail = await OrderDetails.findOne({
            where: {OrderId: req.params.id, UserId: req.user.id},
            include: { model: Products, as: 'products', attributes: ['productImage, title', 'price']},
            attributes: ['quantity', 'sum', 'color']
        })
        res.status(200).json(orderDetail)
    } catch (error) {
        
    }
}
const deletedOrder = async (req, res) => {
    const deleteOrder = await Orders.findOne({
        where: {
            id: req.params.id,
            UserId: req.user.id
        }
    })
    await deleteOrder.destroy()
    res.status(200).json('deleted!')
}
module.exports = {createOrder, createOrderItem, updateOrderToPaid, updateOrderToDelivery, getOrdersIncome, getOrders, deletedOrder, getOrderDetail, getYourOrderDetail}