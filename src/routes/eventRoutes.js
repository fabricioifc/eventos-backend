const express = require('express');
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

const router = express.Router();

const { validate, Joi } = require('express-validation')

const eventValidation = {
    createEvent: {
        body: Joi.object({
            title: Joi.string().required(),
            date: Joi.date().required(),
            startTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
            endTime: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
            capacity: Joi.number().required(),
            status: Joi.boolean().required()
        })
    }
}

router.post('/', auth, validate(eventValidation.createEvent), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;
