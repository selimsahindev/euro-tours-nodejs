const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const { Roles } = require('../enums/Roles');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo(Roles.User, Roles.Admin),
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo(Roles.User, Roles.Admin),
    reviewController.deleteReview,
  );

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo(Roles.User),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

module.exports = router;
