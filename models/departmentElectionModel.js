const mongoose = require("mongoose");

const departmentElectionSchema = new mongoose.Schema({
  officialCandidates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "DepartmentCandidate",
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
  isStarted: {
    type: Boolean,
    default: false,
  },
  isEnded: {
    type: Boolean,
    default: false,
  },
});

const DepartmentElection = mongoose.model(
  "DepartmentElection",
  departmentElectionSchema
);

module.exports = DepartmentElection;
