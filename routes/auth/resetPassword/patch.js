import crypto from 'crypto';
import User from '../../../models/User';
import AppError from '../../../utils/appError';
import authController from '../../../controllers/authController';

export default async function (req, res, next) {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  authController.createSendToken({ user, statusCode: 200, res });
}
