const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctOption: Number,
  solution: String,
  year: Number,
  topic: String, // Add the "topic" field as a String
});

module.exports = mongoose.model('Question', questionSchema);