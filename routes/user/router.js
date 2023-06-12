import express from 'express';
import { catchAsync } from '../../utils/catchAsync.js';

import authLogin from '../auth/login/post.js';
import authRegister from '../auth/register/post.js';
import authUpdatePassword from '../auth/updatePassword/patch.js';

import forgotPassword from '../auth/forgotPassword/post.js';
import resetPassword from '../auth/resetPassword/patch.js';

import getAllUsers from './getAllUsers/get.js';
import getUser from './getUser/get.js';
import createUser from './createUser/post.js';
import updateMe from './updateMe/patch.js';
import deleteMe from './deleteMe/delete.js';

import { authProtected } from '../../middleware/auth.js';

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
  .get('/', catchAsync(authProtected), catchAsync(getAllUsers))
  .post('/', createUser)
  .get('/:id', getUser)
  .patch('/update-me', catchAsync(authProtected), catchAsync(updateMe))
  .patch('/delete-me', catchAsync(authProtected), catchAsync(deleteMe));

export default router;
