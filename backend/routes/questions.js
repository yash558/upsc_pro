// backend/routes/questions.js

const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Create a new question
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
