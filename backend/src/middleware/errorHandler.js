const logger = require("../config/logger");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    logger.error(
        {
            err,
            method: req.method,
            url: req.originalUrl,
            statusCode
        },
        "Request failed"
    );
    if (res.headersSent) {
        return next(err);
    }
    res.status(statusCode).json({
        message:
            statusCode >= 500
                ? "Internal Server Error"
                : err.message
    });
};
module.exports = errorHandler;