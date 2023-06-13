import express from 'express';
import bodyParse from 'body-parser';
import morgan from 'morgan';

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

import toursRoute from './routes/tours/router';
import userRoute from './routes/user/router';
import AppError from './utils/appError';
import { getDirPath } from './utils/getDirPath';
import { globalErrorHandler } from './controllers/errorController';
import { TOUR_FIELDS } from './utils/constants'

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });

  app.use('/api', limiter);
}

app.use(helmet());

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json({ limit: '10kb' }));
app.use(express.static(getDirPath(import.meta.url, 'public')));

// Data Sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());
// Data Sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: TOUR_FIELDS,
  }),
);

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
