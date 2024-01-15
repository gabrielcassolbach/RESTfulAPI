const mongoose = require('mongoose');

const dotenv = require('dotenv');

// Setting up config.env file variables.
dotenv.config({path : './config/config.env'});

const connectDatabase = () => { mongoose.connect(process.env.DB_LOCAL_URI, {
}).then(con => {
    console.log(`MongoDB Database connected with host: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;