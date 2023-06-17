import reviewController from '../../../controllers/reviewController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function getAllReviews(req, res, next) {
  const reviews = await reviewController.getAllReviews();

  sendResponse(res, 200, reviews.length, reviews, null);
}
