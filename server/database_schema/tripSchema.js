const mongoose = require('mongoose');
const { Schema } = mongoose;

const TripSchema = new Schema({
    userID: String,
    startDate: String,
    endDate: String,
    tripID: String,
    adults: Number,
    children: Number,
    destination: [String],
    itinerary: [{
        title: String,
    }]
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;