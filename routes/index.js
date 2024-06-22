var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clubhouse' });
});

// ----- ROUTES ------
// GET sign-in
router.get('/signin', userController.signin_get)
// POST sign-in
router.post('/signin', userController.signin_post)
// GET sign-up
router.get('/signup', userController.signup_get)
// POST sign-up
router.post('/signup', userController.signin_post)


module.exports = router;
