const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getStats,
} = require('../controllers/jobController');

router.use(protect); // every route below requires login

router.get('/stats', getStats);
router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;