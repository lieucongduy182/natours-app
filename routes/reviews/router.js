import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import { authProtected, restrictTo } from '../../middleware/auth';

import createReview from './createReview/post';
import getAllReviews from './getAllReviews/get';

const router = express.Router();

router
  .route('/')
  .get(catchAsync(getAllReviews))
  .post(authProtected, restrictTo('user'), catchAsync(createReview));

export default router;
