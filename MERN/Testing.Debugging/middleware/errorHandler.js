// server/middleware/errorHandler.js
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('Global Error Handler:', { error: err.message, stack: err.stack });
  res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;
