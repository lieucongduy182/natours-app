import mongoose from 'mongoose';
import Tour from './Tour';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be empty !'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
    },
    tours: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      require: [true, 'Review must belong to a tour.'],
    },
    users: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: [true, 'Review must belong to a user.'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'users',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calculateAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tours: tourId },
    },
    {
      $group: {
        _id: '$tours',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  const reviewRating = {
    ratingsQuantity: 0,
    ratingsAverage: 4.5,
  };

  if (stats.length > 0) {
    reviewRating.ratingsQuantity = stats[0].nRating;
    reviewRating.ratingsAverage = stats[0].avgRating;
  }

  await Tour.findByIdAndUpdate(tourId, reviewRating);
};

reviewSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.tours);
});

// Update review middleware
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.preReview = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.preReview.constructor.calculateAverageRatings(
    this.preReview.tours,
  );
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
