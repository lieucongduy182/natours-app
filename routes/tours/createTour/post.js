import tourController from '../../../controllers/tourController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const data = req.body;
  const newTour = await tourController.createTour({ data });

  sendResponse(res, 200, newTour.length, { newTour }, null);
}
