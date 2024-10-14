const { Event } = require('../models');

class EventRepository {
    async create(eventData) {
        return Event.create(eventData);
    }

    async findAll() {
        return Event.findAll();
    }

    async findById(eventId) {
        return Event.findByPk(eventId);
    }
}

module.exports = new EventRepository();
