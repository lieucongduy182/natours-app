import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthController {
  signToken({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async register({ data }) {
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      passwordChangedAt: data.passwordChangedAt,
    });

    const token = await this.signToken({ id: newUser._id });

    return {
      newUser,
      token,
    };
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

    const token = await this.signToken({ id: user._id });

    return { token };
  }
}

export default new AuthController();
