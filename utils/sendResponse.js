export const sendResponse = (res, statusCode, result, data, message) => {
  let status = '';
  if (statusCode >= 200 && statusCode < 300) {
    status = 'success';
  } else {
    status = 'fail';
  }
  res.status(statusCode).json({
    status: status,
    result: result,
    data: data,
    message: message,
  });
};
