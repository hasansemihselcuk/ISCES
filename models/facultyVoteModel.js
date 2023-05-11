const mongoose = require("mongoose");

const facultyVoteSchema = new mongoose.Schema({
  voteSender: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  voteReceiver: {
    type: mongoose.Schema.ObjectId,
    ref: "FacultyCandidate",
  },
  voteDate: {
    type: Date,
    default: Date.now(),
  },
});

const facultyVote = mongoose.model("FacultyVote", facultyVoteSchema);

module.exports = FacultyVote;
