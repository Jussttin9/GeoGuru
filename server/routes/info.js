const express = require('express');
const router = express.Router();
const { getLocationData, getAttractions } = require('../travel');

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

module.exports = router;