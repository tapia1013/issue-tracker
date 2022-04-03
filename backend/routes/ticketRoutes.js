const express = require('express');
const router = express.Router();
const { getTickets, createTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

// if we use router.route() we're allowed to add on to it
router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router;