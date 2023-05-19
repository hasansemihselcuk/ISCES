const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//SONRA YAPILCAK
const multer = require("multer");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  studentNumber: {
    type: String,
    trim: true,
  },
  iztechMail: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  GPA: {
    type: Number,
    trim: true,
    default: 2.0,
  },
  year: {
    type: Number,
    trim: true,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: "Department",
  },
  image: {
    type: String,
    trim: true,
    default: "default.jpg",
  },
  isCandidate: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVotedForDepartment: {
    type: Boolean,
    default: false,
  },
  isVotedForFaculty: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
