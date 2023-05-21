const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID);

router
  .get('/', tourController.getAllTours)
  .post('/', tourController.createTour)
  .get('/:id', tourController.getTour)
  .put('/:id', tourController.updateTour)
  .delete('/:id', tourController.deleteTour);

module.exports = router;
