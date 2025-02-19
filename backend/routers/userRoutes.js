const express = require('express');
const router = express.Router();
const userController = require('../controllers/ctfController'); 


router.get('/categories', userController.getCategories);
router.post('/submit', userController.submitAnswer);
router.get('/score', userController.getCurrentScore);
router.get('/categories/question:', userController.getQuestionbyCategory);
router.get('/rank',userController.getRank);



module.exports = router;
