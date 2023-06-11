import User from '../models/User.js';
import { filterObj } from '../utils/filterObject.js';

class UserController {
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUser({ userId }) {}

  async createUser({ data }) {}

  async updateMe({ data, userId }) {
    const filterDataToUpdated = filterObj(data, 'name', 'email');
    if (!Object.keys(filterDataToUpdated).length) return null;
    const newUser = await User.findByIdAndUpdate(userId, filterDataToUpdated, {
      new: true,
      runValidators: true,
    });

    return newUser;
  }

  async deleteMe({ userId }) {
    await User.findByIdAndUpdate(userId, { active: false });
  }
}

export default new UserController();
