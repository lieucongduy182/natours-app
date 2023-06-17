import reviewController from '../../../controllers/reviewController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function createReview(req, res, next) {
  const { _id: userId } = req.user;
  const data = req.body;
  data.users = userId;
  const review = await reviewController.createReview({ data });
  sendResponse(res, 201, review.length, review, null);
}
