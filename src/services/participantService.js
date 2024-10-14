const participantRepository = require('../repositories/participantRepository');
const enviarEmail = require('./emailService');

class ParticipantService {

    async createParticipant(data) {
        return participantRepository.create(data);
    }

    async registerParticipant(userId, eventId) {
        if (!userId || !eventId) {
            throw new Error('User ID and Event ID are required');
        }

        // Check if the user is already registered for the event
        const participant = await participantRepository.findByUserIdAndEventId(userId, eventId);
        if (participant) {
            throw new Error('User is already registered for the event');
        }

        const registration = await participantRepository.register(userId, eventId);

        if (registration) {
            let registered = await participantRepository.findRegisteredParticipant(userId, eventId);
            // Send email confirmation
            await enviarEmail({
                to: registered.user.email,
                subject: 'Registration Confirmation',
                html: `You have successfully registered for the event ${registered.event.title}`,
            });
        }
        return registration, {
            message: 'Registration successful. Check your email for confirmation',
        };
    }

    async unregisterParticipant(userId, eventId) {
        console.log(userId, eventId);

        if (!userId || !eventId) {
            throw new Error('User ID and Event ID are required');
        }

        // Check if the user is registered for the event
        const participant = await participantRepository.findByUserIdAndEventId(userId, eventId);
        if (!participant) {
            throw new Error('User is not registered for the event');
        }

        return participant.destroy();
    }

    async getParticipantsByEvent(eventId) {
        return participantRepository.findByEventId(eventId);
    }

    async getAllParticipants() {
        return participantRepository.findAll();
    }
}

module.exports = new ParticipantService();
