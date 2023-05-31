export const sendResponse = (res, statusCode, result, data, message) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'fail',
    result: result,
    data: data,
    message: message,
  });
};
