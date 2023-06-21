import reviewController from '../../../controllers/reviewController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function deleteReview(req, res, next) {
  const { id: reviewId } = req.params.id;

  if (!reviewId) {
    return next(new AppError('No review found with that ID', 404));
  }
  await reviewController.deleteReview({ reviewId });

  sendResponse(res, 203, 1, null, 'Review deleted successfully');
}
