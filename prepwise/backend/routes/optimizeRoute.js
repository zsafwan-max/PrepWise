const express = require('express');
const { optimizeStudyPlan } = require('../algorithms/studyOptimizer');

const router = express.Router();

function isRating(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

function validateStudyPlanRequest(body) {
  const errors = [];

  if (!body.examName || typeof body.examName !== 'string') {
    errors.push('Exam name is required.');
  }

  if (!Number.isInteger(body.totalHours) || body.totalHours <= 0) {
    errors.push('Total available study hours must be a positive whole number.');
  }

  if (!Array.isArray(body.topics) || body.topics.length === 0) {
    errors.push('At least one topic is required.');
  } else {
    body.topics.forEach((topic, index) => {
      const label = `Topic ${index + 1}`;

      if (!topic.name || typeof topic.name !== 'string') {
        errors.push(`${label} needs a name.`);
      }

      if (!Number.isInteger(topic.estimatedHours) || topic.estimatedHours <= 0) {
        errors.push(`${label} estimated hours must be a positive whole number.`);
      }

      if (!isRating(topic.importance)) {
        errors.push(`${label} importance must be a whole number from 1 to 5.`);
      }

      if (!isRating(topic.difficulty)) {
        errors.push(`${label} difficulty must be a whole number from 1 to 5.`);
      }

      if (!isRating(topic.confidence)) {
        errors.push(`${label} confidence must be a whole number from 1 to 5.`);
      }
    });
  }

  return errors;
}

router.post('/optimize-study-plan', (req, res) => {
  const errors = validateStudyPlanRequest(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const result = optimizeStudyPlan(req.body);
  return res.json(result);
});

module.exports = router;
