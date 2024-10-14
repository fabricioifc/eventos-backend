// models/event.js
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.DATE,
    });

    Event.associate = function (models) {
        Event.belongsToMany(models.User, {
            through: 'Participant',
            as: 'participants',
            foreignKey: 'eventId',
        });
    };

    return Event;
};
