import reviewController from '../../../controllers/reviewController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function updateReview(req, res, next) {
  const { id: reviewId } = req.params;
  const data = req.body;

  if (!reviewId) {
    return next(new AppError('No review found with that ID', 404));
  }

  if (!data) {
    return next(new AppError('No data to update review', 404));
  }

  const review = await reviewController.updateReview({ reviewId, data });

  sendResponse(res, 202, review.length, { review }, null);
}
