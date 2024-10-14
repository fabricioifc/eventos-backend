const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // User.belongsToMany(models.Event, {
      //   through: models.Participant,
      //   foreignKey: 'user_id',
      //   as: 'events'
      // });
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });

  return User;
}

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       User.belongsToMany(models.Event, {
//         through: models.Participant,
//         foreignKey: 'user_id',
//         as: 'events'
//       });
//     }
//   }
//   User.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };