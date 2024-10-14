'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsToMany(models.User, {
        through: models.Participant,
        foreignKey: 'eventId',
        as: 'participants'
      });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    capacity: DataTypes.NUMBER,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
  });
  return Event;
};