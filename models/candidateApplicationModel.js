const mongoose = require("mongoose");
//BU SONRA YAPILACAK
const multer = require("multer");

const candidateApplicationSchema = new mongoose.Schema({
  studentInfos: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
  },
  applicationPdf: {
    type: String,
    trim: true,
  },
  applicationDate: {
    type: Date,
    default: Date.now(),
  },
  isApplicationAccepted: {
    type: Boolean,
    default: false,
  },
});

const CandidateApplication = mongoose.model(
  "CandidateApplication",
  candidateApplicationSchema
);

module.exports = CandidateApplication;
