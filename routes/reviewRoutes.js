const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const { Roles } = require('../enums/Roles');

const router = express.Router({ mergeParams: true });

router.route('/:id').get(reviewController.getReview);
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo(Roles.User),
    reviewController.createReview,
  );

module.exports = router;
