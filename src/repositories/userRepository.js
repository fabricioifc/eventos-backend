// repositories/userRepository.js
const { User } = require('../models');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async create(user) {
        return User.create(user);
    }

    async findById(id) {
        return User.findByPk(id, { attributes: { exclude: ['password'] } });
    }

    async findAll() {
        return User.findAll({ attributes: { exclude: ['password'] } });
    }

    async update(id, user) {
        return User.update(user, { where: { id } });
    }
}

module.exports = new UserRepository();
