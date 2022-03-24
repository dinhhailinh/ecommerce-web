const jwt = require ('jsonwebtoken')

const requireLogin = async(req, res, next) => {
    const authHeader = req.headers['authorization']; //Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({error:"Null token"});
    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
        if (error) return res.status(403).json({error : error.message})
        req.user = {
            id: data.id,
            email: data.email,
            isAdmin: data.isAdmin
        }
        next();
    });
}

const checkAdmin = async(req, res, next) => {
    if (req.user.isAdmin !== true) {
        return res.status(401).json({
            message: "Admin access denied"
        });
    }
    next();
}

module.exports = { requireLogin, checkAdmin }
