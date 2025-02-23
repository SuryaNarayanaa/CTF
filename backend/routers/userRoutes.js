const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); 
const {validateSubmitAnswer} = require('../middlewares/validation.middleware.js')


router.get('/getCurrentUser',userController.getCurrentUser)
router.get('/categories', userController.getCategories);
router.post('/submit',validateSubmitAnswer, userController.submitAnswer);
router.get('/score', userController.getCurrentScore);
router.get('/category-question/:id', userController.getQuestionbyCategory);
router.get('/rank',userController.getRank);



module.exports = router;
