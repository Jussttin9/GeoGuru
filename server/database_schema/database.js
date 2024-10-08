const mongoose = require('mongoose');
const User = require('./userSchema');
const Trip = require('./tripSchema');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error);
    }
};

module.exports = { connectToDatabase, User, Trip };
