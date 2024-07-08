const {body, validationResult} = require('express-validator')
const asyncHandler = require('express-async-handler')

exports.messageValidator = [
    body('title')
        .trim()
        .escape(),
    body('message', 'This field cannot be empty')
        .notEmpty()
        .isLength({min: 3})
        .withMessage('The minimum length is 3 characters')
]

exports.errors = asyncHandler(async(req, res, next) => {
    const result = validationResult(req)
    const errors = result.array()
    console.log('----------- ' + errors.length + ' ----------')
    
    if (!errors.length){ 
        return next() 
    } else {
        console.log(errors)
        res.render('message_form', {
            title: 'New message',
            errors: errors,
            user: req.user,
        })  
    }
})

exports.edit_errors = asyncHandler(async(req, res, next) => {
    const result = validationResult(req)
    const errors = result.array()
    console.log('----------- ' + errors.length + ' ----------')
    
    if (!errors.length){ 
        return next() 
    } else {
        console.log(errors)
        const message = await Message.findById(req.params.id).exec()
        res.render('message_form', {
            title: 'Edit message',
            message: message,
            errors: errors,
            user: req.user,
        })  
    }
})