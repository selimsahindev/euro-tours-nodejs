const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');
const { Roles } = require('../enums/Roles');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo(Roles.Admin, Roles.LeadGuide),
    tourController.getMonthlyPlan,
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo(Roles.Admin, Roles.LeadGuide, Roles.Guide),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo(Roles.Admin, Roles.LeadGuide),
    tourController.deleteTour,
  );

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo(Roles.Admin, Roles.LeadGuide),
    tourController.createTour,
  );

module.exports = router;
