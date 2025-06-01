// File: index.js

// Load environment variables from .env (if present)
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Default port is 3000, or use process.env.PORT if defined
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Routes

// 1) Health-check route
//    GET /health → { status: 'OK', timestamp: <number> }
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// 2) Echo endpoint
//    POST /echo with JSON body → { youSent: <same JSON> }
app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});

// 3) 404 handler for any unmatched route
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// 4) Error handler (catches thrown errors in routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Only start the server if this file is run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export the Express app for Supertest (Jest) to mount
module.exports = app;
