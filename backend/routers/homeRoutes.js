const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController'); 


router.get('/leaderboard',homeController.getLeaderboard);
module.exports = router;
