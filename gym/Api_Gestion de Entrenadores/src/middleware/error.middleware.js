const ApiError = require('../utils/api-error');

const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err);

  // If the error is an ApiError instance, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle validation errors (from Joi)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: err.details ? err.details.map(detail => detail.message) : [err.message]
    });
  }

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON in request body'
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;