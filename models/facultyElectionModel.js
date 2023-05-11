const mongoose = require("mongoose");

const facultyElectionSchema = new mongoose.Schema({
  officialCandidates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Candidate",
    },
  ],
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now() + 1 * 24 * 60 * 60 * 1000,
  },
});

const FacultyElection = mongoose.model(
  "FacultyElection",
  facultyElectionSchema
);

module.exports = FacultyElection;
