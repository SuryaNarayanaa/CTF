const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 
const {validateCreateQuestion,validateQuestionId,validateLogin,validateUserID} = require('../middlewares/validation.middleware.js')

router.get('/questions', adminController.getQuestions);
router.post('/questions',validateCreateQuestion, adminController.createQuestion);
router.put('/questions',adminController.updateQuestion);
router.delete('/questions/:id', validateQuestionId,adminController.deleteQuestion);

router.get('/user', adminController.getUsers);
router.get('/user/:id', validateQuestionId,adminController.getUserById);

router.get('/dashboard', adminController.getDashboard);

module.exports = router;
