const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {validateSignUp,validateLogin} = require('../middlewares/validation.middleware.js')


router.post('/signup',validateSignUp,authController.signup);
router.post('/login', validateLogin,authController.login);
router.post('/logout', authController.logout);

module.exports = router;