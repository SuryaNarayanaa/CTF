const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController'); 

router.post('/create', teamController.createTeam);
router.post('/join', teamController.joinTeam);

module.exports = router;
