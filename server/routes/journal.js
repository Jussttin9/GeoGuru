const express = require('express');
const router = express.Router();
const { createJournalEntry } = require('../controllers/entryController');

// Route to create a journal entry
router.post('/create', createJournalEntry);

module.exports = router;