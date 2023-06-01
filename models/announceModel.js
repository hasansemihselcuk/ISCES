const mongoose = require("mongoose");

const announceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
  },
});

const Announce = mongoose.model("Announce", announceSchema);

module.exports = Announce;
