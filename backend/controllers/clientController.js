import asyncHandler from "../middleware/asyncHandler.js";
import Client from "../models/clientModel.js";

// Create a client
// POST /api/clients
// Private
const createClient = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { clientName, clientNumber, clientEmail } = req.body;

  console.log(req.user);

  if (!clientName && !clientNumber) {
    res.status(400);
    throw new Error("Please add both client name and number");
  } else {
    const client = new Client({
      clientName,
      clientNumber,
      clientEmail,
    });

    const createdClient = await client.save();
    res.status(201).json(createdClient);
  }
});

// get clients
// GET /api/clients
// Private
const getClients = asyncHandler(async (req, res) => {
  console.log("get clients");
  const clients = await Client.find({});
  res.status(200).json(clients);
});

// get clients
// GET /api/clients/:clientId
// Private
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404);
      throw new Error("client not found");
    }
});

export { createClient, getClients, getClient };
