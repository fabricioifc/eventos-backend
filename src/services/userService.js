// services/userService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const enviarEmail = require('../services/emailService');
const userRepository = require('../repositories/userRepository');

class UserService {
    async register(userData) {
        const { name, email, password } = userData;

        try {
            const existingUser = await userRepository.findByEmail(email);

            if (existingUser) {
                throw new Error('User already exists', 400);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await userRepository.create({
                name,
                email,
                password: hashedPassword,
            });

            // JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return token;
        } catch (error) {
            throw new Error(error.message, error.status);
        }

    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { user, token };
    }

    async me(userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async sendForgotPasswordEmail(email) {
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

        const message = `Clique no link para resetar sua senha: <a href="${resetUrl}">Alterar senha</a>`;

        await enviarEmail({
            to: user.email,
            subject: 'Password reset',
            text: message,
        });
    }

    // Reset password with token and new password
    async resetPassword({ token, password }) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (!decoded) {
                throw new Error('Invalid or expired token');
            }

            const user = await userRepository.findById(decoded.id);

            if (!user) {
                throw new Error('User not found');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await userRepository.update(user.id, { password: hashedPassword });
        } catch (error) {
            throw new Error(error.message, error.status);
        }
    }

    async updateProfile(userId, data) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        await userRepository.update(userId, data);

        return await userRepository.findById(userId);
    }
}

module.exports = new UserService();
