import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import { authProtected, restrictTo } from '../../middleware/auth';

import createTourReview from './createTourReview/post';
import getTourReviews from './getTourReviews/get';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(catchAsync(getTourReviews))
  .post(authProtected, restrictTo('user'), catchAsync(createTourReview));

export default router;
