const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController'); 

router.post('/create', teamController.createTeam);
router.post('/join', teamController.joinTeam);
router.get('/all', teamController.getallTeams);
router.post('/updateUnlocked',teamController.updateUnlocked );

module.exports = router;
