const eventRepository = require('../repositories/eventRepository');

class EventService {
    async createEvent(eventData) {
        return eventRepository.create(eventData);
    }

    async getAllEvents() {
        return eventRepository.findAll();
    }

    async getEventById(eventId) {
        return eventRepository.findById(eventId);
    }
}

module.exports = new EventService();
