const { ValidationError } = require('express-validation');

const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error);
    }

    return res.status(500).json({ message: error.message });
}

const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
}

module.exports = { errorHandler, notFound };