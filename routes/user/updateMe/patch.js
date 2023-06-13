import userController from '../../../controllers/userController';
import AppError from '../../../utils/appError';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const {
    user: { _id: userId },
    body: data,
  } = req;

  if (data.password || data.passwordConfirm) {
    return next(new AppError('This route is not updating password', 401));
  }

  const newUser = await userController.updateMe({ data, userId });

  if (!newUser) {
    sendResponse(
      res,
      400,
      null,
      null,
      'Nothing to update! Please provide data to update',
    );
  }

  sendResponse(res, 200, { newUser }, null);
}
