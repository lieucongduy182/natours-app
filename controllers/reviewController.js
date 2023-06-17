import Review from '../models/Review';

class ReviewController {
  getAllReviews() {
    return Review.find();
  }

  createReview({ data }) {
    return Review.create(data);
  }
}

export default new ReviewController();
