const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 
const {validateCreateQuestion,validateQuestionId,validateUserID} = require('../middlewares/validation.middleware.js')

router.get('/questions', adminController.getQuestions);
router.post('/questions',validateCreateQuestion, adminController.createQuestion);
router.put('/questions',adminController.updateQuestion);
router.delete('/questions/:id', validateQuestionId,adminController.deleteQuestion);

router.get('/user', adminController.getUsers);
router.get('/user/:id', validateUserID,adminController.getUserById);

module.exports = router;
