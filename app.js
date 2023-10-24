const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Global Middlewares

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100, // 100 requests per hour.
  windowMs: 60 * 60 * 1000, // In milliseconds.
  message: 'Too many requests from this IP, please try again in an hour!',
});

// Apply the limiter only to the /api route.
app.use('/api', limiter);
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

app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
