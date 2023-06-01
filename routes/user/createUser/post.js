import userController from '../../../controllers/userController.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const data = req.body;
  const newUser = await userController.createUser({ data });

  sendResponse(res, 201, { user: newUser }, null);
}
