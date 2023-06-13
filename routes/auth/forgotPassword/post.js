import User from '../../../models/User';
import AppError from '../../../utils/appError';
import { sendMail } from '../../../utils/sendMail';
import { sendResponse } from '../../../utils/sendResponse';

export default async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get('host')}${
      req.baseUrl
    }/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:\n${resetURL}\nIf you didn't forget your password, please ignore this email!`;

    await sendMail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    sendResponse(res, 200, null, null, 'Token sent to email!');
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
}
