const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);
router.post('/logout', authController.logout);
router.post("/fun", authController.funthing)

module.exports = router;