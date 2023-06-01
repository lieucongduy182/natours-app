import userController from '../../../controllers/userController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const userId = req.params.id;
  const user = await userController.getUser(userId);

  sendResponse(res, 200, { user }, null);
}
