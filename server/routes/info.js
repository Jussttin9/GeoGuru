const express = require('express');
const router = express.Router();
const { getLocationData, getAttractions } = require('../travel');
const { getEvents } = require('../events');

// Route to get attractions
// example: http://localhost:4000/info/attractions?city=Seoul&country=kr&radius=10000
router.get('/attractions', async (req, res) => {
    try {
        const { city, country, radius } = req.query;
        const attractions = await getAttractions(city, country, radius);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
});

// Route to get events
router.get('/events', async (req, res) => {
    try {
        const { timeInterval, budgetPerPerson, category, city, country, radius, startDate, endDate } = req.query;
        const coords = await getLocationData(city, country);
        const latitude = coords.lat;
        const longitude = coords.lon;

        const events = await getEvents(timeInterval, budgetPerPerson, category, latitude, longitude, radius, startDate, endDate);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

module.exports = router;