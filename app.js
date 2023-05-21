const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');

const app = express();

const toursRoute = require('./routes/tours');
const userRoute = require('./routes/user');

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', toursRoute);

module.exports = app;
