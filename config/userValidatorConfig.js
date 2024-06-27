const {body, validationResult} = require('express-validator')
const Users = require('../models/userModel')
const asyncHandler = require('express-async-handler')

exports.userSignup = [
    body('first_name', 'this field is required')
        .trim()
        .notEmpty()
        .isLength({min: 3})
        .escape(),
    body('last_name', 'this field is required')
        .trim()
        .notEmpty()
        .isLength({min: 3})
        .escape(),
    body('username', 'this field is required')
        .trim()
        .notEmpty()
        .isLength({min: 3})
        .custom(
            async value => {
            const existingUser = await Users.findOne({username: value});
            if (existingUser) {
              throw new Error('Username already in use');
            }
          })
        .escape(),
    body('password', 'Password not strong enough')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          }),
    body('confirm_password', 'this field is required')
        .trim()
        .notEmpty()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Both password must be the same')
            }
            return true;
        })  
]

exports.errors = asyncHandler(async(req, res, next) => {
    const result = validationResult(req)
    const errors = result.array()
    console.log('----------- ' + errors.length + ' ----------')
    
    if (!errors.length){ 
        return next() 
    } else {
        console.log(errors)
        res.render('signup_form', {
            title: 'Sign up',
            errors: errors,
        })  
    }
})

exports.checkLogin = asyncHandler(async(req, res, next) => {
    if (req.isAuthenticated()){
        return next()
    } 
    res.redirect('/signin')
})