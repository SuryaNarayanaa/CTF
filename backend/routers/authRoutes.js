const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateSignUp,validateLogin} = require('../middlewares/validation.middleware.js')
const {autheicateUser} = require('../middlewares/authprovider.js')

router.post('/signup',validateSignUp,authController.signup);
router.post('/login', validateLogin,authController.login);
router.post('/logout',autheicateUser, authController.logout);

module.exports = router;