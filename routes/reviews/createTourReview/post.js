import reviewController from '../../../controllers/reviewController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function createTourReview(req, res, next) {
  if (!req.body.tours) req.body.tours = req.params.tourId;
  if (!req.body.users) req.body.users = req.user.id;
  const data = req.body;
  const review = await reviewController.createReview({ data });

  sendResponse(res, 201, review.length, review, null);
}
