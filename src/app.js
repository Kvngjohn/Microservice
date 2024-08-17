const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(morgan('combined')); // Logging
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app; // Export for testing
