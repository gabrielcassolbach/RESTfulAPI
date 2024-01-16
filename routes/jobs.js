const express = require('express');
const router = express.Router();

// Importing jobs controller methods.
const {getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob} = require('../controllers/jobsController.js');

router.route('/jobs').get(getJobs);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(newJob);
router.route('/job/:id').put(updateJob);
router.route('/job/:id').delete(deleteJob);
router.route('/job/:id/:slug').get(getJob);

module.exports = router;