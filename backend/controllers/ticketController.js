import asyncHandler from "../middleware/asyncHandler.js";
import Ticket from "../models/ticketModel.js";
import Client from "../models/clientModel.js";

// Create a ticket
// POST /api/tickets
// Private
const createTicket = asyncHandler(async (req, res) => {
  
  // get ticket from body
  const {
    itemName,
    model,
    serial,
    fault,
    paymentMethod,
    totalPrice,
    clientId,
  } = req.body;

  // get client by id
  const client = await Client.findByIdAndUpdate(clientId);

  // set ticket info
  const ticket = new Ticket({
    clientName: client.clientName,
    clientNumber: client.clientNumber,
    clientId,
    paymentMethod,
    totalPrice,
    itemName,
    model,
    serial,
    fault,
  });

  // set client ticket info
  const clientTicket = {
    paymentMethod,
    totalPrice,
    itemName,
    model,
    serial,
    fault,
  };

  client.tickets.push(clientTicket);
  client.ticketsIsOpen = client.ticketsIsOpen ? client.ticketsIsOpen += 1 : 1

  await client.save();
  const ticketCreated = await ticket.save();
  res.status(201).json(ticketCreated);
});

// get tickets
// GET /api/tickets
// Private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({});
  res.status(200).json(tickets);
});

// get tickets
// GET /api/tickets
// Private
const getTicketById = asyncHandler(async (req, res) => {

  const ticket = await Ticket.findById(req.params.id);

  console.log("TICKET:", req.params.id)

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404);
    throw new Error("ticket not found");
  }
});

export { createTicket, getTickets, getTicketById };
