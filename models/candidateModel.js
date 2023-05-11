const mongoose = require("mongoose");

const candidateModel = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    Ref: "CandidateApplication",
  },
  isDepartmentCandidate: {
    type: Boolean,
    default: false,
  },
  isFacultyCandidate: {
    type: Boolean,
    default: false,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateModel);

module.exports = Candidate;
