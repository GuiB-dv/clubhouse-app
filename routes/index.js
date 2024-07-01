var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')
const validate = require('../config/userValidatorConfig')

/* GET home page. */
router.get('/',validate.checkLogin, messageController.display_messages)

// ----- ROUTES ------

// ----- USER -----
// GET sign-in
router.get('/signin', validate.checkNotLogin, userController.signin_get)
// POST sign-in
router.post('/signin', validate.checkNotLogin, userController.signin_post)
// GET sign-up
router.get('/signup', validate.checkNotLogin, userController.signup_get)
// POST sign-up
router.post('/signup', validate.checkNotLogin, validate.userSignup, validate.errors, userController.signup_post)
// GET sign-out
router.get('/signout', validate.checkLogin, userController.signout_get)


// ----- MESSAGE -----
// GET new message
router.get('/message/new', validate.checkLogin, messageController.new_message_get)
// POST new message
router.post('/message/new', validate.checkLogin, messageController.new_message_post)
// GET edit message
router.get('/message/:id/edit', validate.checkLogin, messageController.edit_message_get)
// POST edit
router.post('/message/:id/edit', validate.checkLogin, messageController.edit_message_post)
// GET delete message
router.get('/message/:id/delete', validate.checkLogin, messageController.delete_message_get)
// POST delete message
router.post('/message/:id/delete', validate.checkLogin, messageController.delete_message_post)


module.exports = router;
