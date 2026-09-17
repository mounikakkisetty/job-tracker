const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    default: 'Full-time',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  jobUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Selected', 'Rejected'],
    default: 'Applied',
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);