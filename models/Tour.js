import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name !'],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price !'],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
