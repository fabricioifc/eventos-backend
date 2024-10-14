const eventService = require('../services/eventService');

class EventController {
    async createEvent(req, res, next) {
        try {
            const event = await eventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (error) {
            next(error);
        }
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await eventService.getAllEvents();
            res.json(events);
        } catch (error) {
            next(error);
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventService.getEventById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.json(event);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EventController();