import fs from 'fs';
import { getDirPath } from '../utils/getDirPath.js';
const tours = JSON.parse(
  fs.readFileSync(
    getDirPath(import.meta.url, '../dev-data/data/tours-simple.json'),
  ),
);

class TourController {
  async getAllTours(req, res, next) {
    const requestTimeAt = req.requestTime;

    res.status(200).json({
      status: 'success',
      requestTimeAt,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  }

  async getTour(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const requestTimeAt = req.requestTime;

    const tour = tours.find((tour) => tour.id === id);
    if (!tour) {
      return res.status(500).json({
        status: 'fail',
        message: 'Bad Request !',
      });
    }

    return res.status(200).json({
      status: 'success',
      requestTimeAt,
      data: {
        tour,
      },
    });
  }

  async createTour(req, res, next) {
    const newTour = req.body;
    const requestTimeAt = req.requestTime;

    newTour.id = tours.length + 1;
    tours.push(newTour);

    return res.status(201).json({
      status: 'success',
      requestTimeAt,
      message: 'Create Successfully',
    });
  }
  async updateTour(req, res, next) {}
  async deleteTour(req, res, next) {}

  async checkID(req, res, next) {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
  }
}

export default new TourController();
