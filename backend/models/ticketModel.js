import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Client",
    },
    clientName: {
      type: String,
      required: false,
      ref: "Client",
    },
    clientNumber: {
      type: String,
      required: false,
      ref: "Client",
    },
    completedBy: {
      type: String,
      required: false,
      ref: "User",
    },
    notes: [noteSchema],
    itemName: { type: String, required: false },
    model: { type: String, required: false },
    serial: { type: String, required: false },
    fault: { type: String, required: false },
    isOpen: {
      type: Boolean,
      required: false,
      default: true,
    },
    isClosed: {
      required: false,
      type: Boolean,
      default: false,
    },
    inProgress: {
      type: Boolean,
      required: false,
      default: false,
    },
    completedAt: {
      required: false,
      type: Date,
    },
    collectedAt: {
      required: false,
      type: Date,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    paidAt: {
      required: false,
      type: Date,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      number: { type: Number },
    },
    totalPrice: {
      type: Number,
      required: false,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
