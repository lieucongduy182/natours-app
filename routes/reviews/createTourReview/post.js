import reviewController from '../../../controllers/reviewController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function createTourReview(req, res, next) {
  const data = req.body;
  const review = await reviewController.createReview({ data });

  sendResponse(res, 201, review.length, review, null);
}
