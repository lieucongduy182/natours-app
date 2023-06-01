import tourController from '../../../controllers/tourController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const tours = await tourController.getTourStats();

  sendResponse(res, 200, tours.length, { tours }, null);
}
