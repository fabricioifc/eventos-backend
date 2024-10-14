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
}

module.exports = new UserController();
