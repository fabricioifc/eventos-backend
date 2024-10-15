const express = require('express');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - ${NODE_ENV}`);
});
