const { Participant } = require('../models');

class ParticipantRepository {
    async create(participantData) {
        return Participant.create(participantData);
    }

    async findAll() {
        return Participant.findAll();
    }

    async findByEventId(eventId) {
        try {
            // Eager loading
            const participants = Participant.findAll({
                where: {
                    eventId,
                },
                include: {
                    association: 'user',
                    attributes: ['name', 'email'],
                },
            });


            return participants;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new ParticipantRepository();
