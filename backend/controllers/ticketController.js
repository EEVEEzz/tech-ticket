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
  client.ticketsIsOpen = client.ticketsIsOpen ? (client.ticketsIsOpen += 1) : 1;

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

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404);
    throw new Error("ticket not found");
  }
});

// create ticket note
// GET /api/tickets/:id/notes
// Private
const createNote = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const ticket = await Ticket.findByIdAndUpdate(req.params.id);

  const createdNote = {
    user: req.user._id,
    name: req.user.name,
    comment,
  };

  ticket.notes.push(createdNote);

  ticket.inProgress = true;

  const ticketNoteCreated = await ticket.save();
  res.status(201).json(ticketNoteCreated);
});

// update ticket to paid
// PUT /api/tickets/:id/pay
// Private
const updateToPaid = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  console.log("TICKET", ticket)

  if (ticket) {
    ticket.isPaid = true;
    ticket.paidAt = Date.now();
    ticket.paymentResult = {
      id: ticket.clientId,
      status: "Paid",
      update_time: Date.now(),
      name: ticket.clientName,
    };

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// update ticket to collected
// PUT /api/orders/:id/collect
// Private
const updateToCollected = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.isCollected = true;
    ticket.collectedAt = Date.now();

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// update ticket to collected
// PUT /api/orders/:id/complete
// Private
const updateToCompleted = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  const client = await Client.findById(ticket.clientId);

  console.log("CLIENT DETAILS: ", client)

  if (ticket) {
    ticket.isOpen = false;
    ticket.inProgress = false;
    ticket.isClosed = true;
    ticket.isCompleted = true;
    ticket.completedAt = Date.now();
    ticket.completedBy = req.user.name;
    client.ticketsIsOpen = client.ticketsIsOpen ? (client.ticketsIsOpen -= 1) : 1;
    client.ticketsIsClosed = client.ticketsIsOpen ? (client.ticketsIsOpen += 1) : 1;

    const updatedOrder = await ticket.save();
    await client.save();

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createTicket,
  getTickets,
  getTicketById,
  createNote,
  updateToPaid,
  updateToCollected,
  updateToCompleted,
};
