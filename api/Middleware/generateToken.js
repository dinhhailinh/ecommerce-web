const jwt = require ('jsonwebtoken') 

const jwtToken = (id, email, isAdmin) => {
    const data = {id, email, isAdmin}
    const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '20d' })
    return  accessToken
}

module.exports = {jwtToken}