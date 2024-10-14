// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const participantRoutes = require('./participantRoutes');

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/events', eventRoutes);
router.use('/participants', participantRoutes);

module.exports = router;
