const express = require('express');
const router = express.Router();
const ctfController = require('../controllers/ctfController'); 


router.get('/questions', ctfController.getQuestions);
router.post('/submit', ctfController.submitAnswer);
router.get('/score', ctfController.getCurrentScore);
router.get('/questions/:id', ctfController.getQuestionById);
router.post('/correct',ctfController.correct);
module.exports = router;
