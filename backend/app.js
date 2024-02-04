const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://yashsharma06033:N3yNHU6iEp5JYL24@cluster0.cwdvpzz.mongodb.net/questions?retryWrites=true&w=majority'; // Replace with your MongoDB URI
// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
const questionsRouter = require('./routes/questions');
app.use('/api/questions', questionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
