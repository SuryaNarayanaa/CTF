const express = require('express');
const router = express.Router();
const ctfController = require('../controllers/ctfController'); 


router.get('/questions', ctfController.getQuestions);
router.post('/submit', ctfController.submitAnswer);

module.exports = router;
