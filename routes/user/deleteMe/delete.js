import userController from '../../../controllers/userController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  await userController.deleteMe({ userId: req.user._id });

  sendResponse(res, 203, null, null, 'User deleted');
}
