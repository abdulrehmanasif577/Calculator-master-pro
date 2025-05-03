// This file is specifically for Vercel deployment
const express = require('express');
const path = require('path');
const app = express();

// Serve static assets
app.use(express.static(path.join(__dirname, '../dist')));

// API routes go here
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from TradeCalc Pro!' });
});

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// For local testing
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;