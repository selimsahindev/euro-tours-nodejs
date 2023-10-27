const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { Roles } = require('../enums/Roles');

const router = express.Router();

// Public routes.
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// All routes after this point are protected.
router.use(authController.protect);

// Protected routes.
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateLoggedInUser', userController.updateLoggedInUser);
router.delete('/deleteLoggedInUser', userController.deleteLoggedInUser);

// All routes after this point are restricted to admins.
router.use(authController.restrictTo(Roles.Admin));

// Admin routes.
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
