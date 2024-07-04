const Message = require('../models/messageModel')
const asyncHandler = require('express-async-handler')
const {DateTime} = require('luxon')
const { findById } = require('../models/userModel')
const validateMessage = require('../config/messageValidatorConfig')

exports.display_messages = asyncHandler(async(req, res, next) => {
    const allMessages = await Message.find().populate('author').sort({timestamp: -1}).exec()
    const user = req.user;
    if(allMessages) {
        res.render ('index', {
            title: 'Messages',
            msg: allMessages,
            user: user
        })
        console.log(allMessages)
    } else {
        console.log('No messages found')
        res.render('index', {title: 'Clubhouse'})
    }

})

exports.message_detail = asyncHandler(async(req, res, next) => {
    const message = await Message.findById(req.params.id)
        .populate("author")
        .exec()
    const user = req.user;    
    if (message === null) {
        const err = new Error("Message not found");
        err.status = 404;
        return next(err);
    }
    res.render("message_detail", {
        title: "Message",
        message: message,
        user: user
    })
})

exports.new_message_get = asyncHandler(async(req, res, next) => {
    const user = req.user
    res.render('message_form', {title: 'New message', user: user})
})

exports.new_message_post = [
    validateMessage.messageValidator,
    validateMessage.errors,
    asyncHandler(async(req, res, next) => {
        const user = req.user
        try{
            const message = new Message ({
                title: req.body.title,
                message: req.body.message,
                timestamp: DateTime.now(),
                author: req.user.id
            })
            const result = await message.save()
            console.log(message)
            res.redirect('/')
        } catch(err) {
            return next(err)
        }
    })
]

exports.edit_message_get = asyncHandler(async(req, res, next) => {
    res.render('message_form', {title: 'Edit message', message:'NOT IMPLEMENTED'})
})

exports.edit_message_post = asyncHandler(async(req, res, next) => {
    res.render('message_form', {title: 'Edit message', message:'NOT IMPLEMENTED'})
})

exports.delete_message_get = asyncHandler(async(req, res, next) => {
    res.render('message_details', {title: 'Delete message', message:'NOT IMPLEMENTED'})
})

exports.delete_message_post = asyncHandler(async(req, res, next) => {
    res.render('message_details', {title: 'Delete message', message:'NOT IMPLEMENTED'})
})