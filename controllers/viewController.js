const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.find({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour || tour.length === 0) {
    return renderErrorPage(res, 'Something went wrong', 'Tour not found');
  }

  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour: tour[0],
  });
});

function renderErrorPage(res, error, description) {
  return res.status(200).render('error', {
    title: 'Error',
    error: error,
    description: description,
  });
}
