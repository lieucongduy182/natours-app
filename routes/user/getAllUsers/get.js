import userController from '../../../controllers/userController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const users = await userController.getAllUsers();

  sendResponse(res, 200, { users }, null);
}
