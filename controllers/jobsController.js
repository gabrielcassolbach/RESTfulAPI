const Job = require('../models/jobs.js');
const geoCoder = require('../utils/geocoder');

// Get all jobs =>  /url to get all jobs.
exports.getJobs =  async (req, res, next) => {
    const jobs = await Job.find()
    res.status(200).json({
        sucess: true,
        results: jobs.length,
        data: jobs
    });
} 

// Create a new Job => {{Domain}}/jobs.
exports.newJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(200).json({
        sucess: true, 
        message: 'Job Created.',
        data: job
    });
}

// Update a Job => /job/:id
exports.updateJob = async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
           sucess: false,
           message: 'Job not found' 
        });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        sucess: true, 
        message: 'Job is updated',
        data: job
    })
}

// Delete a Job => /job/:id
exports.deleteJob = async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
           sucess: false,
           message: 'Job not found' 
        });
    }

    job = await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        sucess: true,
        message: 'Job is deleted.'
    })
} 


// Search jobs within radius => /jobs/:zipcode/:distance
exports.getJobsInRadius = async (req, res, next) => {
    const { zipcode, distance } = req.params;
    
    // Getting latitude & longitude from geocoder with zipcode.
    const loc = await geoCoder.geocode(zipcode);
    const latitude = loc[0].latitude;
    const longitude = loc[0].longitude;
    
    const radius = distance / 3963; 

    const jobs = await Job.find({
        location: {$geoWithin: {$centerSphere: [[longitude, latitude], radius]}}
    })

    res.status(200).json({
        sucess: true,
        results: jobs.length,
        data: jobs
    })
}