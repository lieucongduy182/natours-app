import Review from '../models/Review';

class ReviewController {
  getTourReviews(filter) {
    return Review.find(filter);
  }

  createReview({ data }) {
    return Review.create(data);
  }

  updateReview({ reviewId, data }) {
    return Review.findByIdAndUpdate(reviewId, data, {
      new: true,
      runValidators: true,
    });
  }

  deleteReview({ reviewId }) {
    return Review.findByIdAndDelete(reviewId);
  }
}

export default new ReviewController();
