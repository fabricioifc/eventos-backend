const participantService = require('../services/participantService');

class ParticipantController {

    async createParticipant(req, res, next) {
        try {
            const participant = await participantService.createParticipant(req.body);
            res.status(201).json(participant);
        } catch (error) {
            next(error);
        }
    }

    async registerParticipant(req, res, next) {
        try {
            const participant = await participantService.registerParticipant(req.user.id, req.params.id);
            res.json(participant);
        } catch (error) {
            next(error);
        }
    }

    async unregisterParticipant(req, res, next) {
        try {
            const participant = await participantService.unregisterParticipant(req.user.id, req.params.id);
            res.json(participant);
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

    async getAllParticipants(req, res, next) {
        try {
            const participants = await participantService.getAllParticipants();
            res.json(participants);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ParticipantController();
