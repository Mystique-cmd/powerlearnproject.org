// errorHandler.js
const { AppError } = require('./errors');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    // Fallback for unexpected errors
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
};

module.exports = errorHandler;
