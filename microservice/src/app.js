const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// Use restricted logging format in production
const logFormat = process.env.NODE_ENV === 'production' ? 'common' : 'combined';
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error occurred during ${req.method} ${req.url}:`, err.stack);
  res.status(500).send('An unexpected error occurred. Please try again later.');
  next();
});
  } else {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  }
});
module.exports = app; // Export for testing purposes, such as unit tests or integration tests
module.exports = app; // Export for testing
