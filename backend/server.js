const express = require('express');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Issue Tracker API' })
})

// Routes
app.use('/api/users', require('./routes/userRoutes.js'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))