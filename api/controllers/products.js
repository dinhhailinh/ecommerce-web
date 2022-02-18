const Sequelize = require('sequelize');

const { Products, Categories } = require('../models')
const Product = Products

const Op = Sequelize.Op

const createProduct = async (req, res) =>{
    const {title, image, desc, price, quantity, size, gender, category} = req.body
    try {
        const check = await Product.findAll({where:{
            title: title
        }})
        if(check[0]) {
            res.status(401).json("This Product has been existed")
        }
        else{
            const newProduct = await Product.create({
                title: title,
                productImage: image,
                desc: desc,
                gender: gender,
                CategoryId: category,
                price: price,
                quantity: quantity,
                size: size
            })
            res.status(201).json({
                newProduct
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllProduct = async (req, res) =>{
    const limit = Number(req.query.limit) || 20
    const pageNum = Number(req.query.pageNum) || 1
    const page = limit * (pageNum - 1)
    const {sold, price} = req.query
    const orderItem = []
    if (sold) {
        orderItem.push(['sold', sold])
    }
    if (price) {
        orderItem.push(['price', price])
    }
    try {
        const getProducts = await Product.findAll({
            order: orderItem,
            limit: limit,
            offset: page
        })
        res.status(201).json({
            getProducts
        })
    } catch (error) {
        console.log(error);
    }
}

const getSomeProducts = async (req, res) => {
    const limit = Number(req.query.limit) || 20
    const pageNum = Number(req.query.pageNum) || 1
    const page = limit * (pageNum - 1)

    const {title, gender, CategoryId, sold, min, max, price} = req.query
    const orderItem = []
    if (sold) {
        orderItem.push(['sold', sold])
    }
    if (price) {
        orderItem.push(['price', price])
    }
    async function getConditions(req){
        const filter = {}
        if(title){
            filter.title = {
                [Op.like]: '%' + title + '%'
            }
        }
        if (CategoryId){
            filter.CategoryId = CategoryId
        }
        if (gender){
            filter.gender = gender
        }
        if (min){
            filter.price = {
                [Op.gte]: min
            }
        }
        if (max){
            filter.price = {
                [Op.lte]: max
            }
        }
        if (min && max) {
            filter.price = {
                [Op.between]: [min, max]
            }
        }
        return filter;
    }

    try {
        const getProducts = await Product.findAll({
            order: orderItem,
            where: getConditions(req),
            limit: limit,
            offset: page,
        })
        res.status(201).json({
            getProducts
        })
    } catch (error) {
        console.log(error)
    }
}

const getOneProduct = async (req, res) => {
    try {
        const getOneProduct = await Product.findOne({
            where : {id: req.params.id},
            include: { model: Categories, as: 'category', attributes: ['cateName'] },
            attributes: ['id', 'title', 'productImage', 'price', 'sold', 'size', 'desc', 'gender', 'quantity']
        })
        res.status(200).json(getOneProduct)
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    const input = req.body
    try {
        const find = await Product.findOne({
            where: {id: req.params.id}
        })
        const update = await find.update(input)
        await update.save()
        res.status(200).json(update) 
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const find = await Product.findOne({
            where: {id: req.params.id}
        })
        await find.destroy()
        res.status(200).json('deleted !') 
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {createProduct, getAllProduct, getSomeProducts, getOneProduct, updateProduct, deleteProduct}