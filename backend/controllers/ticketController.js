const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc     Get user tickets
// @route    GET /api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

// @desc     Get user ticket
// @route    GET /api/tickets/:id
// @access   Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found!')
  }

  // Get ticket by its in the PARAMS
  const ticket = await Ticket.findById(req.params.id)

  // check for the ticket
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket Not Found!')
  }

  // Limit only to USER to get TICKET
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

// @desc     Create new tickets
// @route    POST /api/tickets
// @access   Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  // If no product and description sent then give error
  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description of issue')
  }

  // Get user by ID in JWT
  const user = await User.findById(req.user.id)

  // If not user then give error
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Create ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,

}