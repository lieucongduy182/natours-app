import User from '../models/User.js';

class AuthController {
  async register({ data }) {
    const newUser = await User.create(data);
    return newUser;
  }

  async login({ data }) {}
}

export default new AuthController();
