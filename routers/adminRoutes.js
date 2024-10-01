const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 

router.get('/questions', adminController.getQuestions);
router.post('/questions', adminController.createQuestion);
router.put('/questions/:id', adminController.updateQuestion);
router.delete('/questions/:id', adminController.deleteQuestion);

router.get('/participants', adminController.getParticipants);
router.get('/participants/:id', adminController.getParticipantById);
router.delete('/participants/:id', adminController.deleteParticipant);

router.get('/leaderboard', adminController.getLeaderboard);
router.get('/dashboard', adminController.getDashboard);

module.exports = router;
