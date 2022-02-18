const { Addresses } = require('../models')

const createAddress = async (req, res) =>{
    const {address, phone} = req.body
    try {
        
        const Address = await Addresses.create({
            UserId: req.user.id,
            address: address,
            phone: phone
        })
        res.status(201).json({
            Address
        })
        
    } catch (error) {
        console.log(error);
    }
}

const getUserAddress = async (req, res) =>{
    try {
        const getAddresses = await Addresses.findAll({
            where: {UserId: req.user.id}
        })
        res.status(201).json({
            getAddresses
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {createAddress, getUserAddress}