// controllers/tripController.js
const Trip = require('../database_schema/tripSchema');
const User = require('../database_schema/userSchema');


// Create a new trip and add it to a user's list
const addTrip = async (req, res) => {
    try {
        const { userID, startDate, endDate, tripID, budget, destination, itinerary } = req.body;

        // Find user by user ID
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const trip = new Trip({
            startDate,
            endDate,
            tripID,
            userID: user._id,
            budget,
            destination,
            itinerary
        });

        await trip.save();

        // Update the user's trips array
        user.trips.push(trip._id);
        await user.save();

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a trip from a user's list
const updateTrip = async (req, res) => {
    const { userID, tripID, startDate, endDate, newtripID, budget, destination, itinerary } = req.body;

    try {
        
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find and update the trip
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: tripID, userID: userID },
            {
                $set: {
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                    tripID: newtripID || undefined,
                    budget: budget || undefined,
                    destination: destination || undefined,
                    itinerary: itinerary || undefined
                }
            },
            { new: true }
        );

        if(!updatedTrip) {
            res.status(404).json({ error: 'Trip not found or does not belong to the user.' });
        }

        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a trip from a user's list
const deleteTrip = async (req, res) => {
    const { userID, tripID } = req.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.trips = user.trips.filter(entry => entry.toString() !== tripID);

        await user.save();

        await Trip.findByIdAndDelete(tripID);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add itinerary item
const addItineraryItem = async (req, res) => {
    try {
        const tripId = req.params.tripID;
        const { title, location, description, date, cost } = req.body;

        // Find the trip by ID
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Add the new itinerary item
        trip.itinerary.push({ title, location, description, date, cost });
        await trip.save();

        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all itineraries for a trip
const getTripItineraries = async (req, res) => {
    const { tripID } = req.params;

    try {
        const trip = await Trip.findById(tripID);

        if (!trip) {
            return res.status(404).send('Trip not found');
        }

        res.status(200).send(trip.itinerary);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete itinerary item
const deleteItineraryItem = async (req, res) => {
    try {
        const tripId = req.params.tripID;
        const itemId = req.params.itemID;

        // Find the trip by ID
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Remove the itinerary item
        trip.itinerary = trip.itinerary.filter(item => item._id != itemId);
        await trip.save();

        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update itinerary item
const updateItineraryItem = async (req, res) => {
    try {
        const tripId = req.params.tripID;
        const itemId = req.params.itemID;
        const { title, location, description, date, cost } = req.body;

        // Find the trip by ID
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Find the itinerary item by ID and update it
        const itineraryItem = trip.itinerary.id(itemId);
        if (!itineraryItem) {
            return res.status(404).json({ error: 'Itinerary item not found' });
        }

        itineraryItem.title = title || itineraryItem.title;
        itineraryItem.location = location || itineraryItem.location;
        itineraryItem.description = description || itineraryItem.description;
        itineraryItem.date = date || itineraryItem.date;
        itineraryItem.cost = cost || itineraryItem.cost;

        await trip.save();

        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    addTrip,
    updateTrip,
    deleteTrip,
    addItineraryItem,
    getTripItineraries,
    deleteItineraryItem,
    updateItineraryItem,
};
