import authController from '../../../controllers/authController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const data = req.body;
  const newUser = await authController.register({ data });

  sendResponse(res, 201, { user: newUser }, null);
}
