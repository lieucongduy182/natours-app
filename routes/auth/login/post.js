import authController from '../../../controllers/authController.js';
import AppError from '../../../utils/appError.js';

export default async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await authController.login({ data: req.body });

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  authController.createSendToken({ user, statusCode: 200, res });
}
