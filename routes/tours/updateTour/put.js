import tourController from '../../../controllers/tourController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const {
    params: { id },
    body: data,
  } = req;
  const tour = await tourController.updateTour({ id, data });

  if (!tour) {
    return next(new AppError('Not Found The Tour with that ID', 404));
  }

  sendResponse(res, 200, tour.length, { tour }, null);
}
