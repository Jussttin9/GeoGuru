const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firebaseUID: String,
    username: String,
    email: String,
    trips: [{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;