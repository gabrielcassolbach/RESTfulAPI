const express = require('express');
const app = express();

// Setting up config.env file variables.
const dotenv = require('dotenv');
dotenv.config({path : './config/config.env'});
const PORT = process.env.PORT;

const connectDatabase = require('./config/database.js');

connectDatabase();

app.use(express.json());

const jobs = require('./routes/jobs.js');

app.use(jobs);

app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in mode ${process.env.NODE_ENV}`);
})
