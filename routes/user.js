import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router
  .get('/', userController.getAllUsers)
  .post('/', userController.createUser)
  .get('/:id', userController.getUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

export default router;
