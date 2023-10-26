const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitze = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Global Middlewares
// Set security HTTP headers.
app.use(helmet());

// Development logging.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same IP.
const limiter = rateLimit({
  max: 100, // 100 requests per hour.
  windowMs: 60 * 60 * 1000, // In milliseconds.
  message: 'Too many requests from this IP, please try again in an hour!',
});
// Apply the limiter only to the /api route.
app.use('/api', limiter);

// Body parser, reading data from body into req.body.
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection.
app.use(mongoSanitze());

// Data sanitization against XSS.
app.use(xss());

// Prevent parameter pollution.
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Serving static files.
app.use(express.static(`${__dirname}/public`));

// A custom middleware which logs the request time.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Bind the routers to the app.
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
