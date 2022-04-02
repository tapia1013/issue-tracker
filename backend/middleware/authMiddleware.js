const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

// function that is used to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header, splits Bearer[0] and token[1]
      token = req.headers.authorization.split(' ')[1];

      // Verify token, verify(token, secret)... turns to decoded token which will have an ID in it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from decoded token but not the password
      req.user = await User.findById(decoded.id).select('-password');

      // call next piece of middlware
      next()
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized 1')
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized')
  }
})

module.exports = {
  protect
}