import User from '../models/User.js';

class UserController {
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUser({ userId }) {}

  async createUser({ data }) {}

  async updateUser({ userId }) {}

  async deleteUser({ userId }) {}
}

export default new UserController();
