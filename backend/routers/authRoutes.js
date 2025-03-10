const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateSignUp,validateLogin} = require('../middlewares/validation.middleware.js')
const {authenticateUser} = require('../middlewares/authprovider.js')

router.post('/signup',validateSignUp,authController.signup);
router.post('/login', validateLogin,authController.login);
router.post('/logout',authenticateUser, authController.logout);
router.get('/session',authenticateUser,authController.sessionUser)

module.exports = router;