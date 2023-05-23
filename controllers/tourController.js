import Tour from '../models/Tour.js';

class TourController {
  async getAllTours(req, res) {
    try {
      const tours = await Tour.find();

      return res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error,
      });
    }
  }

  async getTour(req, res) {
    try {
      const tour = await Tour.findById(req.params.id);

      return res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error,
      });
    }
  }

  async createTour(req, res) {
    try {
      const newTour = await Tour.create(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          newTour,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'fail',
        message: error,
      });
    }
  }
  async updateTour(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      const tour = await Tour.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error,
      });
    }
  }
  async deleteTour(req, res) {
    try {
      const id = req.params.id;

      await Tour.findByIdAndDelete(id, {
        strict: true,
      });
      return res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error,
      });
    }
  }
}

export default new TourController();
