import express from 'express';
import tourController from '../controllers/tourController.js';

const router = express.Router();

// Alias API for top-5-cheap
router.get(
  '/top-5-cheap',
  tourController.aliasTours,
  tourController.getAllTours,
);

router.get('/stats', tourController.getTourStats);
router.get('/monthly-tours/:year', tourController.getMonthlyTours);

router
  .get('/', tourController.getAllTours)
  .post('/', tourController.createTour)
  .get('/:id', tourController.getTour)
  .put('/:id', tourController.updateTour)
  .delete('/:id', tourController.deleteTour);

export default router;
