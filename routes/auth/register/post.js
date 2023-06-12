import authController from '../../../controllers/authController.js';
import AppError from '../../../utils/appError.js';

export default async function (req, res, next) {
  const data = req.body;
  if (!data) {
    return next(new AppError('Please provide data', 400));
  }

  const user = await authController.register({ data });

  authController.createSendToken({ user, statusCode: 201, res });
}
