class User {
  async getAllUsers(req, res, next) {
    res.status(200).json({
      status: 'success',
      requestTimeAt: req.requestTime,
      data: null,
    });
  }
  async getUser(req, res, next) {}
  async createUser(req, res, next) {
    res.status(201).json({
      status: 'success',
      requestTimeAt: req.requestTime,
    });
  }
  async updateUser(req, res, next) {}
  async deleteUser(req, res, next) {}
}

export default new User();
