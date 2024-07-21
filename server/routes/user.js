const express = require('express');
const router = express.Router();
const { getUser, deleteUser } = require('../controllers/userController');
const registerUser = require('../auth/register');
const loginUser = require('../auth/login');

// Route to get a user's information
router.get('/get-info/:id', getUser);

// Route to register a user
router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userID = await registerUser(email, password, username);
        console.log(userID);
        res.status(201).json({ userID, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to login a user
// **** not working yet **** 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userID = await loginUser(email, password);
        res.status(200).json({ userID, message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a user
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
