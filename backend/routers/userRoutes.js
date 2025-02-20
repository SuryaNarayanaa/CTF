const express = require('express');
const router = express.Router();
const userController = require('../controllers/ctfController'); 
const {validateSubmitAnswer} = require('../middlewares/validation.middleware.js')

router.get('/categories', userController.getCategories);
router.post('/submit',validateSubmitAnswer, userController.submitAnswer);
router.get('/score', userController.getCurrentScore);
router.get('/categories/question:', userController.getQuestionbyCategory);
router.get('/rank',userController.getRank);



module.exports = router;
