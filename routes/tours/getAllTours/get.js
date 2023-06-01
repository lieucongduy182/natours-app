import tourController from '../../../controllers/tourController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const { query } = req;
  const tours = await tourController.getAllTours({ query });

  sendResponse(res, 200, tours.length, { tours }, null);
}
