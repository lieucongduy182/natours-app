import authController from '../../../controllers/authController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const data = req.body;
  const result = await authController.login({ data });
  sendResponse(res, 200, { result }, null);
}
