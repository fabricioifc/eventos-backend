const express = require('express');
const app = require('./src/app');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
});