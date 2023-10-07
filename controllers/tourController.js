const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Body must contain name and price fields',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  try {
    fs.writeFileSync(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        return res.status(201).json({
          status: 'error',
          message: err.message,
        });
      }
    );
  } catch (err) {
    return res.status(201).json({
      status: 'error',
      error: err.message,
    });
  }

  return res.status(400).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

module.exports = { getAllTours, getTour, createTour, checkID, checkBody };
