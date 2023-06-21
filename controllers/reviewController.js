import Review from '../models/Review';

class ReviewController {
  getTourReviews(filter) {
    return Review.find(filter);
  }

  createReview({ data }) {
    return Review.create(data);
  }
}

export default new ReviewController();
