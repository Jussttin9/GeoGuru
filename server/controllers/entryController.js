const Entry = require('../database_schema/entrySchema');
const Trip = require('../database_schema/tripSchema');
const User = require('../database_schema/userSchema');

const createJournalEntry = async (req, res) => {
    try {
        const { userID, tripDestination, title, content } = req.body;

        // Find user by Firebase UID
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find trip by userId and destination
        const trip = await Trip.findOne({ userID: user._id, destination: tripDestination });
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const entry = new Entry({
            title,
            user: user._id,
            trip: trip._id,
            content
        });

        await entry.save();

        res.status(201).json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createJournalEntry };