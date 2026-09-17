const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  family: 4,
  serverSelectionTimeoutMS: 30000,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));
// Test route
app.get('/', (req, res) => {
  res.send('Job Tracker API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});