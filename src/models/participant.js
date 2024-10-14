'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {

    static associate(models) {
      Participant.belongsTo(models.User, { foreignKey: 'user_id' });
      Participant.belongsTo(models.Event, { foreignKey: 'event_id' });
    }
  }
  Participant.init({
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};