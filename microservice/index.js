// Load environment variables from a .env file into process.env
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// The server will default to port 3000 if process.env.PORT is not defined.
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

// Basic health-check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// Example “echo” POST endpoint
app.post('/echo', (req, res) => {
  res.json({ youSent: req.body });
});

// 404 handler (any unmatched route)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler (catches sync & async errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server (only when running this file directly)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
