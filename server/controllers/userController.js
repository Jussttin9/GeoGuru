// controllers/userController.js
const User = require('../database_schema/userSchema');
const { connectToDatabase } = require('../database_schema/database');

const registerUser = async (email, username, id) => {
    try {
        await connectToDatabase();

        const newUser = new User({
            _id: id,
            username: username,
            email: email,
            trips: []
        });

        await newUser.save();
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Find the user by User ID and populates Trips
        const user = await User.findById(userId).populate('trips');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
const deleteUser = async (userID) => {
    try {
        await connectToDatabase();
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        // Delete the user from MongoDB
        await User.findByIdAndDelete(userID);

        console.log('Successfully deleted user:', userID);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

module.exports = { registerUser, getUser, deleteUser };