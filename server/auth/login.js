const firebase = require('./firebase');

const loginUser = async (email, password) => {
    try {
        const userRecord = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('Successfully logged in user:', userRecord.uid);
        return userRecord.uid;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

module.exports = loginUser;
