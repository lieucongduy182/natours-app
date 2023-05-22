import Tour from '../models/Tour.js';

class TourController {
  async getAllTours(req, res) {}

  async getTour(req, res) {}

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
        message: 'Invalid input data !',
      });
    }
  }
  async updateTour(req, res) {
    return res.status(200).json({
      status: 'success',
      message: 'Updated Successfully',
    });
  }
  async deleteTour(req, res) {
    return res.status(204).json({
      status: 'success',
      message: 'Deleted Successfully',
    });
  }
}

export default new TourController();
