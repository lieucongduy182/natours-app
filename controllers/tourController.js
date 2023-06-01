import Tour from '../models/Tour.js';
import APIFeatures from '../utils/api-features.js';

class TourController {
  getAllTours({ query }) {
    const features = new APIFeatures(Tour.find(), query)
      .filter()
      .sort()
      .limitingFields()
      .pagination();
    return features.query;
  }

  getTour({ id }) {
    return Tour.findById(id);
  }

  createTour({ data }) {
    return Tour.create(data);
  }

  updateTour({ id, data }) {
    return Tour.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  deleteTour({ id }) {
    return Tour.findByIdAndDelete(id, {
      strict: true,
    });
  }

  getTourStats() {
    return Tour.aggregate([
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
  }

  getMonthlyTours({ year, limit }) {
    return Tour.aggregate([
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
  }
}

export default new TourController();
