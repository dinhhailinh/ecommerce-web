const CryptoJs = require ('crypto-js')

const { Users } = require('../models')
const { jwtToken } = require ('../Middleware/generateToken')


const User = Users

const cryptoJs = CryptoJs
const createUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    try {
        const checkUser = await User.findOne({
                where:{
                    email: email
                }
            })
            
        if(checkUser) {
            res.status(501).json("account has been existed, please try again")
        }
        else {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: cryptoJs.AES.encrypt(
                    password,
                    process.env.PASS_SECRET
                ).toString()
            })
            res.status(201).json({
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                isAdmin: newUser.isAdmin,
                accessToken: jwtToken(newUser.id, newUser.email, newUser.isAdmin)
            })
        }
    } catch (error) {
        res.status(501).json(error)
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({
                where:{
                    email: email
                }
        })
        if(user[0]) {res.status(401).json("Wrong email")}
        else{
            const hashedPassword = cryptoJs.AES.decrypt(
                user.password,
                process.env.PASS_SECRET
            )
            const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8)
            if (originalPassword != password) {
                res.status(401).json("Wrong Password")
            }
            res.status(201).json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin,
                accessToken: jwtToken(user.id, user.email, user.isAdmin)
            })
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const logout = async (req, res) => {
    await res.clearCookie("accessToken");
    res.status(200).json({
    message: "Logout successfully...!",
  })
}

const getAllUser = async (req, res) => {
    const limit = Number(req.query.limit) || 20
    const pageNum = Number(req.query.pageNum) || 1
    const page = limit * (pageNum - 1)
    try {
        const users = await User.findAll({
            limit: limit,
            offset: page
        })
        res.status.json(users)
    } catch (error) {
        
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({where: {
            id: req.params.userId,
        }})
        res.status(201).json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            avatar: user.avatar
        })
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

const updateProfile = async (req, res) => {
    const input = req.body
    
    try {
        const findUser = await User.findOne(
            {where: {
                id: req.user.id
            }}
        )
        const updateUser = await findUser.update(input)
        await updateUser.save()
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(501).json(error)
    }
    
}

const changePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    try {
        const findUser = await User.findOne(
            {where: {
                id: req.user.id
            }}
        )
        const hashedPassword = cryptoJs.AES.decrypt(
            findUser.password,
            process.env.PASS_SECRET
        )
        const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8)
        if (originalPassword != oldPassword) {
            res.status(401).json("Wrong Password")
        }
        else {
            const updateUser = await findUser.update({
                password: cryptoJs.AES.encrypt(
                    newPassword,
                    process.env.PASS_SECRET
                ).toString()})
            await updateUser.save()
            res.status(201).json('password has been changed!')
        }
    } catch (error) {
        
    }
}

const deleteUser = async (req, res) => {
    try {
        const destroy = await User.findOne({
            where: {id: req.user.id}
        })
        await destroy.destroy()
        res.status(200).json('deleted!')
    } catch (error) {
        
    }
}

module.exports = {createUser, loginUser, logout, getAllUser, getUser, updateProfile, changePassword, deleteUser}