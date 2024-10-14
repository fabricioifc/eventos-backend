const express = require('express');
const participantController = require('../controllers/participantController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, participantController.registerParticipant);
router.get('/event/:eventId', participantController.getParticipantsByEvent);
router.get('/', participantController.getAllParticipants);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Participant = require('../models/participant');
// const Event = require('../models/event');
// const { sendEmail } = require('../services/emailService');

// router.post('/', async (req, res) => {
//     try {
//         const participant = new Participant(req.body);
//         await participant.save();
//         res.status(201).json(participant);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.post('/:id/register', async (req, res) => {
//     try {
//         const participant = await Participant.findById(req.params.id);
//         const event = await Event.findById(req.body.eventId);

//         if (!participant || !event) {
//             return res.status(404).json({ error: 'Participant or event not found' });
//         }

//         participant.events.push(event);
//         await participant.save();

//         await sendEmail(participant.email, 'Event Registration Confirmation', `You have been registered for ${event.name}`);

//         res.json(participant);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;