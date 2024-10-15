const { Event } = require('../models');

class EventRepository {
    async create(event) {
        return await Event.create(event);
    }

    async findAll() {
        return await Event.findAll();
    }

    async findById(id) {
        return await Event.findByPk(id);
    }

    async update(id, event) {
        return await Event.update(event, {
            where: { id },
        });
    }

    async delete(id) {
        return await Event.destroy({
            where: { id },
        });
    }
}

module.exports = new EventRepository();