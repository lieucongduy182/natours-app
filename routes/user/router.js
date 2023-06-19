import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import authLogin from '../auth/login/post';
import authRegister from '../auth/register/post';
import authUpdatePassword from '../auth/updatePassword/patch';

import forgotPassword from '../auth/forgotPassword/post';
import resetPassword from '../auth/resetPassword/patch';

import getAllUsers from './getAllUsers/get';
import getUser from './getUser/get';
import createUser from './createUser/post';
import updateMe from './updateMe/patch';
import deleteMe from './deleteMe/delete';

import { authProtected, restrictTo } from '../../middleware/auth';

const router = express.Router();

// Auth
router
  .post('/register', catchAsync(authRegister))
  .post('/login', catchAsync(authLogin));

router
  .post('/forgot-password', catchAsync(forgotPassword))
  .patch('/reset-password/:token', catchAsync(resetPassword))
  .patch(
    '/update-password',
    catchAsync(authProtected),
    catchAsync(authUpdatePassword),
  );

// User

router
  .get(
    '/',
    catchAsync(authProtected),
    catchAsync(restrictTo('admin')),
    catchAsync(getAllUsers),
  )
  .post('/', catchAsync(authProtected), createUser)
  .get('/:id', catchAsync(authProtected), getUser)
  .patch('/update-me', catchAsync(authProtected), catchAsync(updateMe))
  .patch('/delete-me', catchAsync(authProtected), catchAsync(deleteMe));

export default router;
