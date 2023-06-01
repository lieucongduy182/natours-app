import express from 'express';
import bodyParse from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

import toursRoute from './routes/tours/router.js';
import userRoute from './routes/user/router.js';
import AppError from './utils/appError.js';
import { getDirPath } from './utils/getDirPath.js';
import { globalErrorHandler } from './controllers/errorController.js';

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

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

export default app;
