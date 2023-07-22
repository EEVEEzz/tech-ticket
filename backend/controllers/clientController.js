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

// get clients by id
// DELETE /api/clients/:id
// Private/Admin
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    await Client.deleteOne({ _id: client._id });
    res.status(200).json({ message: "Client deleted successfully!" });
  } else {
    throw new Error("Client not found");
  }
});

// update client by id
// PUT /api/clients/:id
// Private/Admin
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    client.clientName = req.body.clientName || client.clientName;
    client.clientEmail = req.body.clientEmail || client.clientEmail;
    client.clientNumber = req.body.number || client.clientNumber;

    const updatedClient = await client.save();
    res.status(200).json({
      _id: updatedClient._id,
      name: updatedClient.clientName,
      email: updatedClient.clientEmail,
      isAdmin: updatedClient.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

// client profile
// GET /api/clients/profile
// Private
const getClientProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.client._id);

  if (client) {
    res.status(200).json({
      _id: client._id,
      clientName: client.clientName,
      clientEmail: client.clientEmail,
      clientNumber: client.clientNumber,
    });
  } else {
    res.status(404);
    throw new Error("Client not found!");
  }
});

// update client profile
// PUT /api/clients/profile
// Private
const updateClientProfile = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.client._id);

  if (client) {
    client.clientName = req.body.clientName || client.clientName;
    client.clientEmail = req.body.clientEmail || client.clientEmail;

    if (req.body.password) {
      client.password = req.body.password;
    }

    const updatedClient = await client.save();

    res.status(200).json({
      _id: updatedClient._id,
      clientName: updatedClient.clientName,
      clientEmail: updatedClient.clientEmail,
      clientNumber: client.clientNumber,
    });
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

export {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
  updateClientProfile,
  getClientProfile,
};
