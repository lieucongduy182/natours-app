import express from 'express';
import { catchAsync } from '../../utils/catchAsync.js';

import { aliasTours } from '../../middleware/aliasTours.js';
import { authProtected } from '../../middleware/auth.js';

import getAllTours from './getAllTours/get.js';
import getTour from './getTour/get.js';
import createTour from './createTour/post.js';
import updateTour from './updateTour/put.js';
import deleteTour from './deleteTour/delete.js';
import getTourStats from './tour-stats/get.js';
import getMonthlyTours from './monthly-tours/get.js';

const router = express.Router();

// Alias API for top-5-cheap
router.get('/top-5-cheap', aliasTours, catchAsync(getAllTours));

router.get('/stats', catchAsync(getTourStats));
router.get('/monthly-tours/:year', catchAsync(getMonthlyTours));

router
  .get('/', catchAsync(authProtected), catchAsync(getAllTours))
  .post('/', catchAsync(createTour))
  .get('/:id', catchAsync(getTour))
  .put('/:id', catchAsync(updateTour))
  .delete('/:id', catchAsync(deleteTour));

export default router;
