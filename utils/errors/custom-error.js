/**
 * CustomError class
 */
class CustomError extends Error {
    constructor(statusCode = 500, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.name = 'CustomError'
        this.date = new Date();
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;