const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./database_schema/database');

const userRouter = require('./routes/user');
const infoRouter = require('./routes/info');
const tripRouter = require('./routes/trip');

const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

dotenv.config();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for all routes
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
  
app.use(cors(corsOptions));
  

// Route handlers
app.use('/user', userRouter);
app.use('/info', infoRouter);
app.use('/trip', tripRouter);

connectToDatabase();

module.exports = app;
