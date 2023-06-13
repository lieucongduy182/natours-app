import userController from '../../../controllers/userController';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const data = req.body;
  const newUser = await userController.createUser({ data });

  sendResponse(res, 201, { user: newUser }, null);
}
