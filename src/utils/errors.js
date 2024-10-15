const { ValidationError } = require('express-validation');

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }

    console.log(err);


    return res.status(500).json({ message: 'Internal server error' });
}

const notFoundHandler = (req, res, next) => {
    return res.status(404).json({ message: 'Rota não encontrada' });
}

module.exports = {
    CustomError,
    errorHandler,
    notFoundHandler
};