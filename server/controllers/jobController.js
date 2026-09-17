const JobApplication = require('../models/JobApplication');

// CREATE - Add a new job application
const createJob = async (req, res) => {
  try {
    const job = await JobApplication.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// READ ALL - Get all job applications for logged-in user (with search & filter)
const getJobs = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = { user: req.user.id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { jobRole: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await JobApplication.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// READ ONE - Get a single job application by ID
const getJobById = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// UPDATE - Edit a job application
const updateJob = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedJob = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE - Remove a job application
const deleteJob = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job application deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DASHBOARD STATS
const getStats = async (req, res) => {
  try {
    const jobs = await JobApplication.find({ user: req.user.id });

    const stats = {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === 'Applied').length,
      interview: jobs.filter((j) => j.status === 'Interview').length,
      selected: jobs.filter((j) => j.status === 'Selected').length,
      rejected: jobs.filter((j) => j.status === 'Rejected').length,
      recent: jobs.slice(0, 5),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob, getStats };
