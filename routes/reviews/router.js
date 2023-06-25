import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import { authProtected, restrictTo } from '../../middleware/auth';

import createTourReview from './createTourReview/post';
import getTourReviews from './getTourReviews/get';
import updateReview from './updateReview/put';
import deleteReview from './deleteReview/delete';

import setTourUserId from '../../middleware/setTourUserId';

const router = express.Router({ mergeParams: true });

router.use(catchAsync(authProtected));

router
  .route('/')
  .get(catchAsync(getTourReviews))
  .post(
    authProtected,
    restrictTo('user'),
    setTourUserId,
    catchAsync(createTourReview),
  );

router.use(restrictTo('user', 'admin'));
router
  .route('/:id')
  .put(catchAsync(updateReview))
  .delete(catchAsync(deleteReview));

export default router;
