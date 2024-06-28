const Message = require('../models/messageModel')
const asyncHandler = require('express-async-handler')
const {DateTime} = require('luxon')
const { findById } = require('../models/userModel')

exports.display_messages = asyncHandler(async(req, res, next) => {
    const allMessages = await Message.find().sort({timestamp: -1}).exec()
    if(!allMessages) {
        res.render ('index', {
            msg: allMessages
        })
        console.log(msg)
    }
    res.render('index', {title: 'Clubhouse'})
})


exports.new_message_get = asyncHandler(async(req, res, next) => {
    res.render('message_form', {title: 'New message'})
})

exports.new_message_post = asyncHandler(async(req, res, next) => {
    const message = new Message ({
        title: req.body.title,
        message: req.body.message,
        timestamp: DateTime.now(),
        author: req.user.id
    })
    const result = await message.save()
    console.log(message)
    res.redirect('/')
})

exports.edit_message_get = asyncHandler(async(req, res, next) => {
    res.render('message_form', {title: 'Edit message'})
})

exports.edit_message_post = asyncHandler(async(req, res, next) => {
    res.render('message_form', {title: 'Edit message'})
})

exports.delete_message_get = asyncHandler(async(req, res, next) => {
    res.render('message_details', {title: 'Delete message'})
})

exports.delete_message_post = asyncHandler(async(req, res, next) => {
    res.render('message_details', {title: 'Delete message'})
})