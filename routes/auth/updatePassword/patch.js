import authController from '../../../controllers/authController.js';
import AppError from '../../../utils/appError.js';
import { sendResponse } from '../../../utils/sendResponse.js';

export default async function (req, res, next) {
  const {
    params: { id: userId },
    body: data,
  } = req;

  const result = await authController.updatePassWord({ data, userId });

  if (!result) {
    return next(new AppError('Current password is wrong', 401));
  }

  sendResponse(res, 201, 1, { token: result.token }, 'Password updated!');
}
