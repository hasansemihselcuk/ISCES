const mongoose = require("mongoose");

const facultyRepSchema = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "FacultyCandidate",
  },
  isCouncilHead: {
    type: Boolean,
    default: false,
  },
});

const FacultyRep = mongoose.model("FacultyRep", facultyRepSchema);

module.exports = FacultyRep;
