const participantRepository = require('../repositories/participantRepository');

class ParticipantService {
    async registerParticipant(userId, eventId) {
        return participantRepository.create({ userId, eventId });
    }

    async getParticipantsByEvent(eventId) {
        return participantRepository.findByEventId(eventId);
    }

    async getAllParticipants() {
        return participantRepository.findAll();
    }
}

module.exports = new ParticipantService();
