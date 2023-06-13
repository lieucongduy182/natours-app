import userController from '../../../controllers/userController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const users = await userController.getAllUsers();

  sendResponse(res, 200, { users }, null);
}
