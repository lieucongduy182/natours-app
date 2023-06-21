import reviewController from '../../../controllers/reviewController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function getTourReviews(req, res, next) {
  let filter = {};
  if (req.params.tourId) filter = { tours: req.params.tourId };

  const reviews = await reviewController.getTourReviews(filter);

  sendResponse(res, 200, reviews.length, reviews, null);
}
