import authController from '../../../controllers/authController';
import AppError from '../../../utils/appError';

export default async function (req, res, next) {
  const {
    user: { id: userId },
    body: data,
  } = req;

  const user = await authController.updatePassWord({ data, userId });

  if (!user) {
    return next(new AppError('Current password is wrong', 401));
  }

  authController.createSendToken({ user, statusCode: 201, res });
}
