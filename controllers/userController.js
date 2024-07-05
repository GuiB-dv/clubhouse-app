const User = require ('../models/userModel')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const validateUser = require('../config/userValidatorConfig')


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

exports.signup_post = [
    validateUser.userSignup,
    validateUser.errors,
    asyncHandler(async (req, res, next) => {
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
]

exports.signout_get = asyncHandler(async (req, res, next) => {
	res.clearCookie('connect.sid') // clear the session cookie
	req.logout(function(err) { // passport logout 
		if (err) { return next(err); }
		req.session.destroy(function (err) { // destroys the session
			res.redirect('/')
		})
	})
})

exports.membership_get = asyncHandler(async (req, res, next) => {
    res.render('membership_form', {
        title: 'Become a member!',
        user: req.user
    })
})

exports.membership_post = asyncHandler(async (req, res, next) => {
    if (req.body.secret_password.toLowerCase() === 'letmeinplease') {
        try {
            req.user.membership_status = true
            await req.user.save()
            res.redirect('/')
        } catch {
            console.log(err)
            res.status(500).send("Error changing membership status!");
        }
    } else {
        res.render('membership_form', {
            title: 'Become a member!',
            wrong_password: 'Wrong password, try again!',
            user: req.user
        })
    }
})

exports.become_admin_get = asyncHandler(async (req, res, next) => {
    res.render('admin_form', {
        title: 'Become an admin!',
        user: req.user
    })
})

exports.become_admin_post = asyncHandler(async (req, res, next) => {
    if (req.body.secret_password.toLowerCase() === 'iwantmod') {
        try {
            req.user.admin = true
            await req.user.save()
            res.redirect('/')
        } catch {
            console.log(err)
            res.status(500).send("Error changing admin status!");
        }
    } else {
        res.render('admin_form', {
            title: 'Become an admin!',
            wrong_password: 'Wrong password, try again!',
            user: req.user
        })
    }
})
