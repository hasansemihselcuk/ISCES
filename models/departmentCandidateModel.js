const mongoose = require("mongoose");

const departmentCandidateSchema = new mongoose.Schema({
  studentInfos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const DepartmentCandidate = mongoose.model("DepartmenCandidate", departmentCandidateSchema);

module.exports = DepartmentCandidate;
