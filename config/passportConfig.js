const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

module.exports = function(passport){
    passport.use(new LocalStrategy(async(username, password, done) => {
        try {
            const user = await User.findOne({username: username});
            if (!user) {
                return done (null, false, {message: "Incorect Username"});
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done (null, user)
                } else {
                    return done (null, false, {message: "Incorrect password"})
                }
            } catch(err) {
                return done(err)
            } 
        } catch(err) {
            return done(err)             
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async(user, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch(err) {
            done(err)
        }
    })
}