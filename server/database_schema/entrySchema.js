const mongoose = require('mongoose');
const { Schema } = mongoose;

const JournalEntrySchema = new Schema({
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip' },
    date: { type: Date, default: Date.now },
    content: String
});

const Entry = mongoose.model('Entry', JournalEntrySchema);

module.exports = Entry;