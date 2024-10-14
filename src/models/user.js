// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    User.associate = function (models) {
        User.belongsToMany(models.Event, {
            through: 'Participant',
            as: 'events',
            foreignKey: 'userId',
        });
    };

    return User;
};
