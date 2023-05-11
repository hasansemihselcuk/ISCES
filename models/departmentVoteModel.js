const mongoose = require("mongoose");

const departmentVoteSchema = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "DepartmentCandidate",
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const DepartmentVote = mongoose.model("DepartmentVote", departmentVoteSchema);

module.exports = DepartmentVote;
