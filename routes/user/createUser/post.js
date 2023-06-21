import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const data = req.body;
  if (!data) {
    return next(new AppError('Please provide data', 400));
  }

  const newUser = await userController.createUser({ data });

  sendResponse(res, 201, { user: newUser }, null);
}
