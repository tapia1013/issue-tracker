const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 8000;

// Connect to DataBase
connectDB()

const app = express();

// Use express body parser middleware to be able to use to login,register etc.. from the forms in html AKA get data from the body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Issue Tracker API' })
});

// Routes
app.use('/api/users', require('./routes/userRoutes.js'));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));