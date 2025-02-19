const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 

router.get('/questions', adminController.getQuestions);
router.post('/questions', adminController.createQuestion);
router.put('/questions', adminController.updateQuestion);
router.delete('/questions/:id', adminController.deleteQuestion);
router.get('/questions/questionsByCategory', adminController.fetchQuestionsByCategory); //refine

router.get('/user', adminController.getParticipants);
router.get('/user/:id', adminController.getUserById);

router.get('/dashboard', adminController.getDashboard);

module.exports = router;
