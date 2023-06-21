import User from '../models/User';
import { filterObj } from '../utils/filterObject';

class UserController {
  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUser({ userId, popOption = null }) {
    const query = User.findById(userId);
    if (popOption) query.populate(popOption);
    const user = await query;

    if (!user) return null;

    return user;
  }

  async createUser({ data }) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      passwordChangedAt: data.passwordChangedAt,
      role: data.role,
    });
  }

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
