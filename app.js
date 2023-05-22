import express from 'express';
import bodyParse from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

import toursRoute from './routes/tours.js';
import userRoute from './routes/user.js';
import { getDirPath } from './utils/getDirPath.js';

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

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(express.static(getDirPath(import.meta.url, 'public')));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', toursRoute);

export default app;
