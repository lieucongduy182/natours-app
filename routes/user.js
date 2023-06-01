import express from 'express';
import { catchAsync } from '../utils/catchAsync.js';

import authLogin from './auth/login/post.js';
import authRegister from './auth/register/post.js';

import getAllUsers from './user/getAllUsers/get.js';
import getUser from './user/getUser/get.js';
import createUser from './user/createUser/post.js';
import updateUser from './user/updateUser/put.js';
import deleteUser from './user/deleteUser/delete.js';

const router = express.Router();

// Auth
router
  .post('/register', catchAsync(authRegister))
  .post('/login', catchAsync(authLogin));

// User

router
  .get('/', getAllUsers)
  .post('/', createUser)
  .get('/:id', getUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser);

export default router;
