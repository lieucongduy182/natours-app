import tourController from '../../../controllers/tourController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const year = req.params.year * 1;
  const limit = req.query.limit * 1 || 12;
  if (!year) {
    throw new Error('Please provide correctly year');
  }
  const monthlyTours = await tourController.getMonthlyTours({ year, limit });
  sendResponse(res, 200, monthlyTours.length, { monthlyTours }, null);
}
