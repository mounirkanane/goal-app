const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('../backend/middleware/error');
const connectDB = require('./config/db');
const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json()); // Need both of these lines in order to access req.body
app.use(express.urlencoded({extended: false}));

app.listen(port, () => console.log(`Server started on port ${port}`));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);


