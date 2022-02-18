const { check, validationResult } = require('express-validator');

exports.validateRegisterRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('FirstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('LastName is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 , max: 20})
    .matches(/[a-zA-Z]+\W+/g)
    .withMessage('Password min 6 character and include [a-zA-Z]+\W+')
];

exports.validateLoginRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 , max: 20})
    .matches(/[a-zA-Z]+\W+/g)
    .withMessage('Password min 6 character and include [a-zA-Z]+\W+')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}