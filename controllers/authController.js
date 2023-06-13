import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  signToken({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  createSendToken({ user, statusCode, res }) {
    const token = this.signToken({ id: user._id });

    const cookiesOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookiesOption.secure = true;

    res.cookie('jwt', token, cookiesOption);

    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  }

  register({ data }) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      passwordChangedAt: data.passwordChangedAt,
      role: data.role,
    });
  }

  async login({ data }) {
    const { email, password } = data;
    const user = await User.findOne({ email }).select('+password');

    if (!user) return null;
    const isCorrectPassword = await user.correctPassword({
      candidatePassword: password,
      userPassword: user.password,
    });

    if (!isCorrectPassword) return null;

    return user;
  }

  async updatePassWord({ data, userId }) {
    const user = await User.findById(userId).select('+password');

    const checkPassword = await user.correctPassword({
      candidatePassword: data.currentPassword,
      userPassword: user.password,
    });

    if (!checkPassword) return false;

    user.password = data.password;
    user.passwordConfirm = data.passwordConfirm;
    await user.save();

    return user;
  }
}

export default new AuthController();
