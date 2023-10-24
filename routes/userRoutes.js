const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword,
);
router.patch(
  '/updateLoggedInUser',
  authController.protect,
  userController.updateLoggedInUser,
);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
