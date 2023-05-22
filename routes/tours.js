import express from 'express';
import tourController from '../controllers/tourController.js';
const router = express.Router();

router
  .get('/', tourController.getAllTours)
  .post('/', tourController.createTour)
  .get('/:id', tourController.getTour)
  .put('/:id', tourController.updateTour)
  .delete('/:id', tourController.deleteTour);

export default router;
