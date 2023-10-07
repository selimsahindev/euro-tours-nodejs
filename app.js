const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// A custom middleware which logs the request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Bind the routers to the app
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
