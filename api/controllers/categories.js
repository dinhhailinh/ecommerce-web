const { Categories } = require('../models')
const Category = Categories

const createCategory = async (req, res) =>{
    const {category, image} = req.body
    try {
        const check = await Category.findAll({where:{
            cateName: category
        }})
        if(check[0]) {
            
            res.status(401).json("this category has been existed")
        } 
        else {
            const newCategory = await Category.create({
                cateName: category,
                cateImage: image
            })
            res.status(201).json({
                newCategory
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllCategory = async (req, res) =>{
    try {
        const getCategories = await Category.findAll({})
        res.status(201).json(getCategories)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {createCategory, getAllCategory}