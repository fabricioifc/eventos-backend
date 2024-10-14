const { Participant } = require('../models/participant');

class ParticipantRepository {
    async create(participantData) {
        return Participant.create(participantData);
    }

    async findByEventId(eventId) {
        return Participant.findAll({ where: { eventId } });
    }
}

module.exports = new ParticipantRepository();
