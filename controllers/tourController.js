import Tour from '../models/Tour.js';
import APIFeatures from '../utils/api-features.js';
import AppError from '../utils/appError.js';
import { sendResponse } from '../utils/sendResponse.js';

class TourController {
  async aliasTours(req, res, next) {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  }

  async getAllTours(req, res) {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitingFields()
      .pagination();
    const tours = await features.query;

    return sendResponse(res, 200, tours.length, { tours }, null);
  }

  async getTour(req, res, next) {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return next(new AppError('Not Found The Tour with that ID', 404));
    }

    return sendResponse(res, 200, tour.length, { tour }, null);
  }

  async createTour(req, res) {
    const newTour = await Tour.create(req.body);

    return sendResponse(res, 200, newTour.length, { newTour }, null);
  }

  async updateTour(req, res, next) {
    const { id } = req.params;
    const data = req.body;

    const tour = await Tour.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return next(new AppError('Not Found The Tour with that ID', 404));
    }

    return sendResponse(res, 200, tour.length, { tour }, null);
  }

  async deleteTour(req, res, next) {
    const { id } = req.params;

    const tour = await Tour.findByIdAndDelete(id, {
      strict: true,
    });

    if (!tour) {
      return next(new AppError('Not Found The Tour with that ID', 404));
    }

    return sendResponse(res, 200, 1, null, null);
  }

  async getTourStats(req, res) {
    try {
      const tours = await Tour.aggregate([
        {
          $match: {
            ratingsAverage: { $gte: 4.5 },
          },
        },
        {
          $group: {
            _id: { $toUpper: '$difficulty' },
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
          },
        },
        {
          $sort: {
            avgPrice: 1,
          },
        },
      ]);
      sendResponse(res, 200, tours.length, { tours }, null);
    } catch (error) {
      sendResponse(res, 400, null, null, error.message);
    }
  }

  async getMonthlyTours(req, res) {
    const year = req.params.year * 1;
    const limit = req.query.limit * 1 || 12;
    if (!year) {
      throw new Error('Please provide correctly year');
    }
    const monthlyTours = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numberTourStats: { $sum: 1 },
          tours: {
            $push: {
              name: '$name',
              price: '$price',
              size: '$maxGroupSize',
              startDates: '$startDates',
            },
          },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: { _id: 0 },
      },
      {
        $sort: { numberTourStats: -1 },
      },
    ]).limit(limit);
    sendResponse(res, 200, monthlyTours.length, { monthlyTours }, null);
  }
}

export default new TourController();
