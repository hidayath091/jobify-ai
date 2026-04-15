const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(jobs);
});

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const createJob = asyncHandler(async (req, res) => {
  const { company, role, status, dateApplied, notes } = req.body;

  if (!company || !role) {
    res.status(400);
    throw new Error('Please add company and role');
  }

  const job = await Job.create({
    user: req.user._id,
    company,
    role,
    status,
    dateApplied: dateApplied || undefined,
    notes,
  });

  res.status(201).json(job);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.status(200).json(job);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const { company, role, status, dateApplied, notes, aiMatchScore, aiFeedback } = req.body;

    job.company = company || job.company;
    job.role = role || job.role;
    job.status = status || job.status;
    job.dateApplied = dateApplied || job.dateApplied;
    job.notes = notes || job.notes;
    job.aiMatchScore = aiMatchScore !== undefined ? aiMatchScore : job.aiMatchScore;
    job.aiFeedback = aiFeedback || job.aiFeedback;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (job) {
    // Check if job belongs to user
    if (job.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job removed' });
  } else {
    res.status(404);
    throw new Error('Job not found');
  }
});

module.exports = {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
