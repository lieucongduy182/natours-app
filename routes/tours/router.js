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

const router = express.Router();
const ROLES_PERMISSIONS = ['admin', 'lead-guide'];

// Alias API for top-5-cheap
router.get(
  '/top-5-cheap',
  catchAsync(authProtected),
  aliasTours,
  catchAsync(getAllTours),
);

router.get('/stats', catchAsync(authProtected), catchAsync(getTourStats));
router.get(
  '/monthly-tours/:year',
  catchAsync(authProtected),
  catchAsync(getMonthlyTours),
);

router
  .get('/', catchAsync(authProtected), catchAsync(getAllTours))
  .post('/', catchAsync(authProtected), catchAsync(createTour))
  .get('/:id', catchAsync(authProtected), catchAsync(getTour))
  .put('/:id', catchAsync(authProtected), catchAsync(updateTour))
  .delete(
    '/:id',
    catchAsync(authProtected),
    restrictTo(ROLES_PERMISSIONS),
    catchAsync(deleteTour),
  );

export default router;
