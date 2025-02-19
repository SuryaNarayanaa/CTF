const express = require('express');
const router = express.Router();
const userController = require('../controllers/ctfController'); 


router.get('/questions', userController.getQuestions);
router.post('/submit', userController.submitAnswer);
router.get('/score', userController.getCurrentScore);
router.get('/questions/:id', userController.getQuestionById);
router.get('/rank',)
router.post('/correct',userController.correct);



module.exports = router;
