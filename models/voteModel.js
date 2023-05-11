const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voteSender: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  voteReceiver: {
    type: mongoose.Schema.ObjectId,
    ref: "Candidate",
  },
  voteDate: {
    type: Date,
    default: Date.now(),
  },
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
