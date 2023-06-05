import authController from '../../../controllers/authController.js';

export default async function (req, res, next) {
  const data = req.body;
  const result = await authController.register({ data });

  return res.status(201).json({
    status: 'success',
    token: result.token,
    data: {
      user: {
        name: result.newUser.name,
        email: result.newUser.email,
      },
    },
  });
}
