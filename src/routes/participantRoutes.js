const express = require('express');
const participantController = require('../controllers/participantController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, participantController.createParticipant);
router.post('/:id/register', auth, participantController.registerParticipant);
router.post('/:id/unregister', auth, participantController.unregisterParticipant);
router.get('/event/:eventId', participantController.getParticipantsByEvent);
router.get('/', participantController.getAllParticipants);

module.exports = router;