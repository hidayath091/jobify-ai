const asyncHandler = require('express-async-handler');
const { getResumeFeedback, getJobMatchScore } = require('../services/aiService');

// @desc    Get AI feedback on resume
// @route   POST /api/ai/resume-feedback
// @access  Private
const resumeFeedback = asyncHandler(async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    res.status(400);
    throw new Error('Please provide resume text');
  }

  const feedback = await getResumeFeedback(resumeText);
  res.status(200).json({ feedback });
});

// @desc    Get AI job match score
// @route   POST /api/ai/match
// @access  Private
const jobMatch = asyncHandler(async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    res.status(400);
    throw new Error('Please provide resume text and job description');
  }

  const result = await getJobMatchScore(resumeText, jobDescription);
  res.status(200).json(result);
});

module.exports = {
  resumeFeedback,
  jobMatch,
};
