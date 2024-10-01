const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); // Import the controller

// Define the home route
router.get('/', homeController.home);

module.exports = router;
