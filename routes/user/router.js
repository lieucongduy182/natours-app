import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import authLogin from '../auth/login/post';
import authRegister from '../auth/register/post';
import authUpdatePassword from '../auth/updatePassword/patch';

import forgotPassword from '../auth/forgotPassword/post';
import resetPassword from '../auth/resetPassword/patch';

import getAllUsers from './getAllUsers/get';
import getCurrentUser from './getCurrentUser/get';
import createUser from './createUser/post';
import updateMe from './updateMe/patch';
import deleteMe from './deleteMe/delete';

import { authProtected, restrictTo } from '../../middleware/auth';
import getMe from '../../middleware/getMe';

const router = express.Router();

// Auth
router
  .post('/register', catchAsync(authRegister))
  .post('/login', catchAsync(authLogin))
  .post('/forgot-password', catchAsync(forgotPassword))
  .patch('/reset-password/:token', catchAsync(resetPassword));

router.use(catchAsync(authProtected));

router
  .get('/me', getMe, catchAsync(getCurrentUser))
  .patch('/update-password', catchAsync(authUpdatePassword))
  .patch('/update-me', catchAsync(updateMe));

router.use(restrictTo('admin'));

// User
router
  .get('/', catchAsync(getAllUsers))
  .post('/', catchAsync(createUser))
  .patch('/delete-me', catchAsync(deleteMe));

export default router;
