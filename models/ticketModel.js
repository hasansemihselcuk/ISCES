const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  studentInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  ticketTitle: {
    type: String,
    trim: true,
  },
  ticketDescription: {
    type: String,
    trim: true,
  },
  ticketDate: {
    type: Date,
    default: Date.now(),
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
