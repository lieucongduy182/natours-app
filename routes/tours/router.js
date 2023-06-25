import express from 'express';
import { catchAsync } from '../../utils/catchAsync';

import { aliasTours } from '../../middleware/aliasTours';
import { authProtected, restrictTo } from '../../middleware/auth';

import getAllTours from './getAllTours/get';
import getTour from './getTour/get';
import createTour from './createTour/post';
import updateTour from './updateTour/put';
import deleteTour from './deleteTour/delete';
import getTourStats from './tour-stats/get';
import getMonthlyTours from './monthly-tours/get';

import reviewRouter from '../reviews/router';

const router = express.Router();
const ROLES_PERMISSIONS = ['admin', 'lead-guide'];

router.use(catchAsync(authProtected));
router.use('/:tourId/reviews', reviewRouter);

router
  .get('/top-5-cheap', aliasTours, catchAsync(getAllTours))
  .get('/stats', catchAsync(getTourStats))
  .get('/', catchAsync(getAllTours))
  .get('/:id', catchAsync(getTour));

router.use(restrictTo(ROLES_PERMISSIONS));

router
  .get('/monthly-tours/:year', catchAsync(getMonthlyTours))
  .post('/', catchAsync(createTour))
  .put('/:id', updateTour)
  .delete('/:id', catchAsync(deleteTour));

export default router;
