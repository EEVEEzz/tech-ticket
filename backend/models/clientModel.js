import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    ticketIsOpen: {
      type: Boolean,
      required: false,
      default: true,
    },
    ticketIsClosed: {
      type: Boolean,
      required: false,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: false,
    },

    itemName: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    serial: {
      type: String,
      required: false,
    },
    fault: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const clientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    clientEmail: {
      type: String,
      required: false,
    },
    ticketsIsOpen: {
      type: Number,
      required: false,
      default: 0,
    },
    ticketsIsClosed: {
      type: Number,
      required: false,
      default: 0,
    },
    tickets: [ticketSchema],
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
