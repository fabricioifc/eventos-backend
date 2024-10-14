'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, {
        through: models.Participant,
        foreignKey: 'event_id',
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};