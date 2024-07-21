const express = require('express');
const router = express.Router();
const { addTrip, deleteTrip, getTripItineraries, addItineraryItem, deleteItineraryItem, updateItineraryItem, updateTrip } = require('../controllers/tripController');

// Route to create a trip itinerary
router.post('/add-trip', addTrip);

// Route to update a trip itinerary
router.put('/update-trip', updateTrip);

// Route to delete a trip itinerary
router.delete('/delete-trip', deleteTrip);

// Route to fetch itineraries of a trip
router.get('/:tripID/itineraries', getTripItineraries);

// Route to add an itinerary item to a trip
router.post('/:tripID/itinerary', addItineraryItem);

// Route to delete an itinerary item from a trip
router.delete('/:tripID/itinerary/:itemID', deleteItineraryItem);

// Route to update an itinerary item in a trip
router.put('/:tripID/itinerary/:itemID', updateItineraryItem);

module.exports = router;
