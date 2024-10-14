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

    async register(userId, eventId) {

        try {
            const participant = await Participant.create({
                userId,
                eventId,
            });

            return participant
        } catch (error) {
            throw new Error(error);
        }
    }

    async findByUserIdAndEventId(userId, eventId) {
        try {
            const participant = await Participant.findOne({
                where: {
                    userId,
                    eventId,
                }
            });

            return participant;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findRegisteredParticipant(userId, eventId) {
        try {
            const participant = await Participant.findOne({
                where: {
                    userId,
                    eventId,
                },
                include: [
                    {
                        association: 'user',
                        attributes: ['name', 'email'],
                    },
                    {
                        association: 'event',
                        attributes: ['title'],
                    },
                ]
            });

            return participant;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new ParticipantRepository();
