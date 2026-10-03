const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
} else {
  console.log('MONGO_URI not provided. Skipping database connection.');
}

app.use('/api/auth', authRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SwipeCart API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
