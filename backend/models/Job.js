const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    role: {
      type: String,
      required: [true, 'Please add a role/position'],
    },
    status: {
      type: String,
      required: [true, 'Please add a status'],
      enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Pending'],
      default: 'Pending',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    aiFeedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
