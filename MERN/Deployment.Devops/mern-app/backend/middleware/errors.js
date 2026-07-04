// middleware/errors.js
export function notFound(req, res, next) {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload =
    process.env.NODE_ENV === 'production'
      ? { message: 'Internal Server Error' }
      : { message: err.message, stack: err.stack };
  res.status(status).json(payload);
}
