require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', require('./routes/companies'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Company Management API', 
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      companies: '/api/companies'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Company API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export for Vercel
module.exports = app;

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
