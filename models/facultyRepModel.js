const mongoose = require("mongoose");

const facultyRepSchema = new mongoose.Schema({
  candidateInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "Candidate",
  },
});

const FacultyRep = mongoose.model("FacultyRep", facultyRepSchema);

module.exports = FacultyRep;
