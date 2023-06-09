import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import { getDirPath } from '../../utils/getDirPath';
import Tour from '../../models/Tour';
import User from '../../models/User';
import Review from '../../models/Review';

// Connect Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected Database Successfully !');
  })
  .catch((error) => {
    console.log('Failed to connect Database', error);
  });

const tours = JSON.parse(
  fs.readFileSync(getDirPath(import.meta.url, './tours.json')),
);
const users= JSON.parse(
  fs.readFileSync(getDirPath(import.meta.url, './users.json')),
);
const reviews = JSON.parse(
  fs.readFileSync(getDirPath(import.meta.url, './reviews.json')),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Imported Data Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Deleted Data Successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
