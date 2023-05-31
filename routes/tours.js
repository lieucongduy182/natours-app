import express from 'express';
import tourController from '../controllers/tourController.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = express.Router();

// Alias API for top-5-cheap
router.get(
  '/top-5-cheap',
  tourController.aliasTours,
  catchAsync(tourController.getAllTours),
);

router.get('/stats', catchAsync(tourController.getTourStats));
router.get('/monthly-tours/:year', catchAsync(tourController.getMonthlyTours));

router
  .get('/', catchAsync(tourController.getAllTours))
  .post('/', catchAsync(tourController.createTour))
  .get('/:id', catchAsync(tourController.getTour))
  .put('/:id', catchAsync(tourController.updateTour))
  .delete('/:id', catchAsync(tourController.deleteTour));

export default router;
