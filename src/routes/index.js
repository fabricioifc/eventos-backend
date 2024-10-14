// routes/index.js
const express = require('express');
const userRoutes = require('./user');
const eventRoutes = require('./event');
const participantRoutes = require('./participant');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/participants', participantRoutes);

module.exports = router;
