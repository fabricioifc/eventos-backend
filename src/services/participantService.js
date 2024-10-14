const participantRepository = require('../repositories/participantRepository');

class ParticipantService {
    async registerParticipant(userId, eventId) {
        return participantRepository.create({ userId, eventId });
    }

    async getParticipantsByEvent(eventId) {
        return participantRepository.findByEventId(eventId);
    }
}

module.exports = new ParticipantService();
