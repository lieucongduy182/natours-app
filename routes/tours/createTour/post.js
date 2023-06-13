import tourController from '../../../controllers/tourController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const data = req.body;
  const newTour = await tourController.createTour({ data });

  sendResponse(res, 200, newTour.length, { newTour }, null);
}
