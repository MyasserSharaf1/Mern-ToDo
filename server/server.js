const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');


// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
// Connect to MongoDB (Mongoose v6+ enables new parser & topology by default)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));})

  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
