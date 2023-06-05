import authController from '../../../controllers/authController.js';
import AppError from '../../../utils/appError.js';

export default async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const result = await authController.login({ data: req.body });

  if (!result) {
    return next(new AppError('Incorrect email or password', 401));
  }

  return res.status(200).json({
    status: 'success',
    token: result.token,
    data: {
      user: {
        email: result.user.email,
      },
    },
  });
}
