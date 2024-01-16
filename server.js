const express = require('express');
const app = express();

// Setting up config.env file variables.
const dotenv = require('dotenv');
dotenv.config({path : './config/config.env'});
const PORT = process.env.PORT;

const connectDatabase = require('./config/database.js');
const errorMiddleware = require('./middlewares/errors.js');
const ErrorHandler = require('./utils/errorHandler.js');


// Handling uncaught exception.
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.');
    process.exit(1);
});

connectDatabase();

app.use(express.json());

const jobs = require('./routes/jobs.js');

app.use(jobs);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in mode ${process.env.NODE_ENV}`);
});

//  Handling Unhandled Promise Rejection.
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close( () => {
        process.exit(1);
    })
});