const participantService = require('../services/participantService');

class ParticipantController {
    async registerParticipant(req, res, next) {
        try {
            const { userId, eventId } = req.body;
            const participant = await participantService.registerParticipant(userId, eventId);
            res.status(201).json(participant);
        } catch (error) {
            next(error);
        }
    }

    async getParticipantsByEvent(req, res, next) {
        try {
            const participants = await participantService.getParticipantsByEvent(req.params.eventId);
            res.json(participants);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ParticipantController();
