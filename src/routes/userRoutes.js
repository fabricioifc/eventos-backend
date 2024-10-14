// routes/userRoutes.js
const express = require('express');
const { validate } = require('express-validation');
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validate(userValidation.register), userController.register);
router.post('/login', validate(userValidation.login), userController.login);
router.get('/me', authMiddleware, userController.me);
router.get('/users', authMiddleware, userController.getAllUsers);
router.post('/logout', authMiddleware, userController.logout);
// router.post('/refresh-token', userController.refreshToken);
router.post('/forgot', userController.forgotPassword);
router.get('/reset-password/:token', userController.resetPasswordPage);
router.post('/reset-password', userController.resetPassword);
router.post('/update-profile', authMiddleware, userController.updateProfile);

module.exports = router;