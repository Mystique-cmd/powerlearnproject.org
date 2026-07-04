// server/app.js
const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ...routes here

app.use(errorHandler);

module.exports = app;
