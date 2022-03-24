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
    .withMessage('Password min 6 character')
    .matches(/[a-zA-Z]+/g)
    .withMessage('Password must be include [a-zA-Z]+')
    .matches(/\W+/g)
    .withMessage('Password must be include \W+')
];

exports.validateLoginRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 , max: 20})
    .withMessage('Password min 6 character')
    .matches(/[a-zA-Z]+/g)
    .withMessage('Password must be include [a-zA-Z]+')
    .matches(/\W+/g)
    .withMessage('Password must be include \W+')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}
