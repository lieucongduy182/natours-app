import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleErrorDuplicateFields = (err) => {
  const value = err.keyValue.name;
  return new AppError(
    `Duplicate Field value: ${value}. Please use another values`,
    400,
  );
};

const handleErrorValidationDB = (err) => {
  const values = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${values.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleTokenExpireError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (res, err) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details

    // 1) Log error:
    console.log('ERROR', err);

    // 2) send generic method
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleErrorDuplicateFields(error);
    if (error.name === 'ValidationError')
      error = handleErrorValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpireError();
    sendErrorProd(res, error);
  }
};
