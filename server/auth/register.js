// register.js

require('dotenv').config();

const { connectToDatabase } = require('../database_schema/database');

const firebase = require('./firebase');
const User = require('../database_schema/userSchema');

const registerUser = async (email, password, username) => {
    try {
        await connectToDatabase();

        const userRecord = await firebase.auth().createUser({
            email: email,
            password: password
        });
        const newUser = new User({
            firebaseUID: userRecord.uid,
            email: email,
            username: username
        });
        await newUser.save();

        console.log('Successfully created new user:', userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
};

module.exports = registerUser;
