const mongoose = require("mongoose");

const departmentCandidateModel = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    Ref: "CandidateApplication",
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const DepartmentCandidate = mongoose.model("DepartmenCandidate", departmentCandidateModel);

module.exports = DepartmentCandidate;
