const express = require('express');
const router = express.Router();
const { registerUser, getUser, deleteUser } = require('../controllers/userController');

// Route to get a user's information
// Example:
// const response = await.get('http://localhost:4000/get-info/${userID}');
router.get('/get-info/:id', getUser);

// Route to register a user
// Example:
    // const response = await axios.post('http://localhost:4000/register', {
    //     email: 'user@example.com',
    //     username: 'username123',
    //     id: 'asidojgruowhjfoiw'
    // });
router.post('/register', async (req, res) => {
    const { email, username, id } = req.body;

    try {
        const userID = await registerUser(email, username, id);
        res.status(201).json({ userID, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a user
// Example:
// const response = await.delete('http://localhost:4000/delete-user/${userID}');
router.delete('/delete-user/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        await deleteUser(userID);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
