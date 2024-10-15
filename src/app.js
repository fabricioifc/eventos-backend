require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./utils/errors');

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
};
// Middlewares
app.use(cors(corsOptions)); // Para que possa ter acesso a API de qualquer lugar
app.use(helmet()); // Para que possa ter mais segurança
app.use(morgan('dev')); // Para que possa ver os logs no console
app.use(bodyParser.json()); // Para que possa receber dados em JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para que possa receber dados de formulários HTML

// Rotas
app.use('/api', routes);

// Error handling. Fica no final do arquivo porque é o último middleware a ser executado e é responsável por tratar os erros
app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;