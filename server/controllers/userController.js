// controllers/userController.js
const User = require('../database_schema/userSchema');

const firebase = require('../auth/firebase');
const { connectToDatabase } = require('../database_schema/database');

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        // Find the user by User ID and populates Trips
        const user = await User.findOne({ firebaseUID: userId }).populate('trips');

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

        // Attempt to delete the user from Firebase
        try {
            await firebase.auth().deleteUser(user.firebaseUID);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log('User not found in Firebase, proceeding with MongoDB deletion');
            } else {
                throw error;
            }
        }

        // Delete the user from MongoDB
        await User.findByIdAndDelete(userID);

        console.log('Successfully deleted user:', userID);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

module.exports = { getUser, deleteUser };