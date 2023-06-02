const mongoose = require("mongoose");

const departmentRepSchema = new mongoose.Schema({
  studentInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  isCandidateForFaculty: {
    type: Boolean,
    default: false,
  },
});

const DepartmentRep = mongoose.model("DepartmentRep", departmentRepSchema);

module.exports = DepartmentRep;
