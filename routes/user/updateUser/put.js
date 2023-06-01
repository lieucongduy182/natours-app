import userController from '../../../controllers/userController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const userId = req.body;
  const user = await userController.updateUser({ userId });

  sendResponse(res, 200, { user }, null);
}
