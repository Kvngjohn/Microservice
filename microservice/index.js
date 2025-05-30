// Load environment variables from a .env file into process.env
import 'dotenv/config';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

// The server will default to port 3000 if the environment variable PORT is not defined.
const PORT = process.env.PORT || 3000;
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
