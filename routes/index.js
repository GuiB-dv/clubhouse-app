var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')
const {checkLogin, checkNotLogin, checkRoleMember, checkRoleNotMember} = require('../config/userValidatorConfig')


/* GET home page. */
router.get('/', checkLogin, messageController.display_messages)

// ----- ROUTES ------

//  USER 
// GET sign-in
router.get('/signin', checkNotLogin, userController.signin_get)
// POST sign-in
router.post('/signin', checkNotLogin, userController.signin_post)
// GET sign-up
router.get('/signup', checkNotLogin, userController.signup_get)
// POST sign-up
router.post('/signup', checkNotLogin, userController.signup_post)
// GET sign-out
router.get('/signout', checkLogin, userController.signout_get)
// GET membership
router.get('/membership', checkRoleNotMember, checkLogin, userController.membership_get)
// POST membership
router.post('/membership', checkRoleNotMember, checkLogin, userController.membership_post)
// GET become admin
router.get('/becomeadmin', checkRoleMember, checkLogin, userController.become_admin_get)
// POST become admin
router.post('/becomeadmin', checkRoleMember, checkLogin, userController.become_admin_post)

//  MESSAGE 
// GET new message
router.get('/message/new', checkLogin, messageController.new_message_get)
// POST new message
router.post('/message/new', checkLogin, messageController.new_message_post)
// GET message details
router.get('/message/:id', checkLogin, messageController.message_detail)
// GET edit message
router.get('/message/:id/edit', checkLogin, messageController.edit_message_get)
// POST edit
router.post('/message/:id/edit', checkLogin, messageController.edit_message_post)
// GET delete message
router.get('/message/:id/delete', checkLogin, messageController.delete_message_get)
// POST delete message
router.post('/message/:id/delete', checkLogin, messageController.delete_message_post)


module.exports = router;
