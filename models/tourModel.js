const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const User = require('./userModel');
const {
  GeometryTypes,
  getGeometryTypeValues,
} = require('../enums/GeometryTypes');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      validate: {
        validator: function (val) {
          return validator.isAlpha(val.split(' ').join(''));
        },
        message: 'Tour name must only contain characters',
      },
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above or equal to 1.0'],
      max: [5, 'Rating must be below or equal to 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      // Custom validator
      validate: {
        validator: function (val) {
          // 'this' only points to current doc on new document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: GeometryTypes.Point,
        enum: getGeometryTypeValues(),
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: GeometryTypes.Point,
          enum: getGeometryTypeValues(),
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: Array,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', async function (next) {
  const guidesPromises = this.guides.map(
    async (guideId) => await User.findById(guideId),
  );

  this.guides = await Promise.all(guidesPromises);

  next();
});

// Query middleware
// For all queries that start with find (We used regex)
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// Aggregation middleware
tourSchema.pre('aggregate', function (next) {
  // Add a match stage to the beginning of the aggregation pipeline
  // this.pipeline() returns an array of all the stages
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
