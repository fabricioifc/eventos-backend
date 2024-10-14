const userService = require('../services/userService');

class UserController {
    async register(req, res, next) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await userService.login(email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async me(req, res, next) {
        try {
            const user = await userService.me(req.user.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // O ideal seria invalidar o token no banco de dados (blacklist)
    async logout(req, res) {
        res.json({ message: 'Logout successful', status: 200, token: null });
    }

    async forgotPassword(req, res, next) {
        try {
            await userService.sendForgotPasswordEmail(req.body.email);
            res.json({ message: 'Email sent', status: 200 });
        } catch (error) {
            next(error);
        }
    }

    async resetPasswordPage(req, res) {
        res.send(`
            <form action="${process.env.CLIENT_URL}/reset-password" method="POST">
                <input type="hidden" name="token" value="${req.params.token}" />
                <input type="password" name="password" placeholder="New password" />
                <button type="submit">Reset password</button>
            </form>
            `)
    }

    // Reset password with token and new password
    async resetPassword(req, res, next) {
        try {
            await userService.resetPassword(req.body);
            res.json({ message: 'Password reset', status: 200 });
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateProfile(req.user.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
