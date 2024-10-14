// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const routes = require('./routes');
const { notFound, errorHandler } = require('./utils/errorHandler');

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
};
app.use(cors(corsOptions)); // Para que possa ter acesso a API de qualquer lugar
app.use(helmet()); // Para que possa ter mais segurança
app.use(morgan('dev')); // Para que possa ver os logs no console
app.use(bodyParser.json()); // Para que possa receber dados em JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para que possa receber dados de formulários HTML

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;