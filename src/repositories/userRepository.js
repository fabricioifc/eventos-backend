// repositories/userRepository.js
const { User } = require('../models');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async create(user) {
        return User.create(user);
    }

    // Outros métodos para busca, atualização e exclusão
}

module.exports = new UserRepository();
