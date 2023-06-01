import express from 'express';
import { catchAsync } from '../utils/catchAsync.js';

import { aliasTours } from '../middleware/aliasTours.js';

import getAllTours from './tours/getAllTours/get.js';
import getTour from './tours/getTour/get.js';
import createTour from './tours/createTour/post.js';
import updateTour from './tours/updateTour/put.js';
import deleteTour from './tours/deleteTour/delete.js';
import getTourStats from './tours/tour-stats/get.js';
import getMonthlyTours from './tours/monthly-tours/get.js';

const router = express.Router();

// Alias API for top-5-cheap
router.get('/top-5-cheap', aliasTours, catchAsync(getAllTours));

router.get('/stats', catchAsync(getTourStats));
router.get('/monthly-tours/:year', catchAsync(getMonthlyTours));

router
  .get('/', catchAsync(getAllTours))
  .post('/', catchAsync(createTour))
  .get('/:id', catchAsync(getTour))
  .put('/:id', catchAsync(updateTour))
  .delete('/:id', catchAsync(deleteTour));

export default router;
