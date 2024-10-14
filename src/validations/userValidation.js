const { validate, ValidationError, Joi } = require('express-validation')

const userValidation = {
    register: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    resetPassword: {
        body: Joi.object({
            token: Joi.string().required(),
            password: Joi.string().required()
        })
    }
}

module.exports = userValidation;