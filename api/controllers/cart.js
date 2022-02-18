const { Carts, Products } = require('../models')

const createCart = async (req, res) =>{
    const {productId} = req.body
    try {
        
        const checkItem = await Carts.findOne({where: 
            {
                UserId: req.user.id,
                ProductId: productId
            },
            attributes: ['quantity']
        })
        if(checkItem){
            const quantity = checkItem.quantity + 1
            const newCart = await Carts.update({
                UserId: req.user.id,
                quantity: quantity
            },
            {where: {ProductId: productId}})
            res.status(201).json(newCart)
        }
        else {
            const newCart = await Carts.create({
                UserId: req.user.id,
                ProductId: productId
            })
            res.status(201).json(newCart)
        }
    } catch (error) {
        res.status(501).json(error)
        console.log(error);
    }
}

const getUserCart = async (req, res) =>{
    try {
        const myCart = await Carts.findAndCountAll({where: {
            UserId: req.user.id
        },
        include: { model: Products, as: 'products', attributes: ['id', 'productImage', 'title', 'price'] },
        attributes: ['id', 'quantity']
    })
        res.status(200).json({myCart});
    } catch (error) {
        console.log(error);
    }
}
const updateCartItem = async (req, res) =>{
    const quantity = req.body
    
    try {
        const findMyCart = await Carts.findOne(
            {where: {
                id: req.params.cartId
            }}
        )
        const updated = await findMyCart.update(quantity)
        await updated.save()
        res.status(201).json(findMyCart)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {createCart, getUserCart, updateCartItem}