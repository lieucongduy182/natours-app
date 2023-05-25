import Tour from '../models/Tour.js';
import APIFeatures from '../utils/api-features.js';
import { sendResponse } from '../utils/sendResponse.js';

class TourController {
  async aliasTours(req, res, next) {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  async getAllTours(req, res) {
    try {
      const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitingFields()
        .pagination();
      const tours = await features.query;

      return sendResponse(res, 200, tours.length, { tours }, null);
    } catch (error) {
      return sendResponse(res, 404, null, null, error.message);
    }
  }

  async getTour(req, res) {
    try {
      const tour = await Tour.findById(req.params.id);

      return sendResponse(res, 200, tour.length, { tour }, null);
    } catch (error) {
      return sendResponse(res, 404, null, null, error);
    }
  }

  async createTour(req, res) {
    try {
      const newTour = await Tour.create(req.body);

      return sendResponse(res, 200, newTour.length, { newTour }, null);
    } catch (error) {
      return sendResponse(res, 400, null, null, error);
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

      return sendResponse(res, 200, tour.length, { tour }, null);
    } catch (error) {
      return sendResponse(res, 400, null, null, error);
    }
  }
  async deleteTour(req, res) {
    try {
      const id = req.params.id;

      await Tour.findByIdAndDelete(id, {
        strict: true,
      });
      return sendResponse(res, 200, 1, null, null);
    } catch (error) {
      return sendResponse(res, 400, null, null, error);
    }
  }
}

export default new TourController();
