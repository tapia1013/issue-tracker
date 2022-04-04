const express = require('express');
const router = express.Router();
const { getTickets, createTicket, getTicket } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

// if we use router.route() we're allowed to add on to it
router.route('/').get(protect, getTickets).post(protect, createTicket)
// since we need an id we cant add on to above
router.route('/:id').get(protect, getTicket)

module.exports = router; 