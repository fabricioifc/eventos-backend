'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {

    static associate(models) {
      Participant.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Participant.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
    }
  }
  Participant.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Event',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Participant',
    tableName: 'participants',
    timestamps: false,
    indexes: [{
      unique: true,
      fields: ['userId', 'eventId']
    }]
  });
  return Participant;
};