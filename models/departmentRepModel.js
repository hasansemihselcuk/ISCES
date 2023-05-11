const mongoose = require("mongoose");

const departmentRepSchema = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "Candidate",
  },
  isCandidateForFaculty: {
    type: Boolean,
    default: false,
  },
});

const DepartmentRep = mongoose.model("DepartmentRep", departmentRepSchema);

module.exports = DepartmentRep;
