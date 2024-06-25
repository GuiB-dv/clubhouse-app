const User = require ('../models/userModel')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator')


exports.signin_get = asyncHandler(async (req, res, next) => {
    res.render('signin_form', {title: 'Sign in'})
})

exports.signin_post = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    }) (req, res, next)
})

exports.signup_get = asyncHandler(async (req, res, next) => {
    res.render('signup_form', {title: 'Sign up'})
})

exports.signup_post = asyncHandler(async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
                membership_status: req.body.membership_status,
            })
            const result = await user.save()
            console.log(user)
            res.redirect('/signin')
        } catch(err) {
            return next(err)
        }
    }
)
