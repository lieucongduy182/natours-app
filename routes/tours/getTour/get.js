import tourController from '../../../controllers/tourController.js';
import AppError from '../../../utils/appError.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const { id } = req.params;
  const tour = await tourController.getTour({ id });

  if (!tour) {
    return next(new AppError('Not Found The Tour with that ID', 404));
  }

  return sendResponse(res, 200, tour.length, { tour }, null);
}
