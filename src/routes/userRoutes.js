// routes/userRoutes.js
const express = require('express');
const { validate } = require('express-validation');
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', validate(userValidation.register), userController.register);
router.post('/login', validate(userValidation.login), userController.login);
router.get('/me', auth, userController.me);
router.get('/users', auth, userController.getAllUsers);
router.post('/logout', auth, userController.logout);
// router.post('/refresh-token', userController.refreshToken);
router.post('/forgot', userController.forgotPassword);
router.get('/reset-password/:token', userController.resetPasswordPage);
router.post('/reset-password', userController.resetPassword);
router.post('/update-profile', auth, userController.updateProfile);

module.exports = router;