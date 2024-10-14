const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Event = require('./event')(sequelize, Sequelize.DataTypes);
const Participant = require('./participant')(sequelize, Sequelize.DataTypes);

// Definir os relacionamentos entre os modelos
User.belongsToMany(Event, {
    through: Participant,
    as: 'events',
    foreignKey: 'userId',
});
Event.belongsToMany(User, {
    through: Participant,
    as: 'participants',
    foreignKey: 'eventId',
});

const db = {
    User,
    Event,
    Participant,
    sequelize,
    Sequelize,
};

module.exports = db;
