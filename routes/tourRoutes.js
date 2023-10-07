const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');

const router = express.Router();
router.param('id', checkID);
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour);

module.exports = router;
