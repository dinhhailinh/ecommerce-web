const slugify = require('slugify')
const { Categories } = require('../models')
const Category = Categories

const createCategory = async(req, res) => {
    const { category, image } = req.body
    try {
        const check = await Category.findAll({
            where:{
                cateName: category
        }})
        if (check[0]) {
            
            res.status(400).json("this category has been existed")
        } 
        else {
            const newCategory = await Category.create({
                cateName: category,
                cateImage: image,
                cateSlug: slugify(category)
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

const getOneCategory = async (req, res) => {
    try {
        const getCategory = await Category.findOne({
            where: {cateSlug: req.params.slug},
            attributes: ['id', 'cateName', 'cateImage', 'cateSlug']
        })
        res.status(201).json(getCategory)
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const getCategory = await Category.findOne({
            where: {id: req.params.id}
        })
        await getCategory.destroy()
        res.status(201).json('delete success')
    } catch (error) {
        console.log(error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const input = req.body
        const getCategory = await Category.findOne({
            where: {id: req.params.id}
        })
        const update = await getCategory.update(input)
        await update.save()
        res.status(201).json('update success')
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createCategory, getAllCategory, getOneCategory, deleteCategory, updateCategory }
