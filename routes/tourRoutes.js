const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour);

module.exports = router;
