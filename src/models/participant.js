// models/participant.js
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
        userId: DataTypes.INTEGER,
        eventId: DataTypes.INTEGER,
    });

    return Participant;
};
