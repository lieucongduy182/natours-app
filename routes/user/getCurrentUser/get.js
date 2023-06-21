import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const userId = req.params.id;
  const user = await userController.getUser({ userId });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  sendResponse(res, 200, { user }, null);
}
